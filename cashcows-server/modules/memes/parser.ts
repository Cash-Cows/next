import type { 
  Stream,
  SchemaResult,
  SchemaParent,
  ImageFrame,
  ImageFrames,
  ImageResultData,
  CanvasStruct
} from './types';

const deinterlace = (pixels: number[], width: number) => {
  const newPixels = new Array(pixels.length);
  const rows = pixels.length / width;
  const cpRow = function(toRow: number, fromRow: number) {
    const fromPixels = pixels.slice(fromRow * width, (fromRow + 1) * width);
    //@ts-ignore
    newPixels.splice.apply(newPixels, [toRow * width, width].concat(fromPixels))
  }

  const offsets = [0, 4, 2, 1];
  const steps = [8, 8, 4, 2];

  var fromRow = 0
  for (var pass = 0; pass < 4; pass++) {
    for (var toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
      cpRow(toRow, fromRow);
      fromRow++;
    }
  }

  return newPixels;
};

const lzw = (minCodeSize: number, data: number[], pixelCount: number) => {
  const MAX_STACK_SIZE = 4096
  const nullCode = -1
  const npix = pixelCount
  var available,
    clear,
    code_mask,
    code_size,
    end_of_information,
    in_code,
    old_code,
    bits,
    code,
    i,
    datum,
    data_size,
    first,
    top,
    bi,
    pi

  const dstPixels = new Array(pixelCount)
  const prefix = new Array(MAX_STACK_SIZE)
  const suffix = new Array(MAX_STACK_SIZE)
  const pixelStack = new Array(MAX_STACK_SIZE + 1)

  // Initialize GIF data stream decoder.
  data_size = minCodeSize
  clear = 1 << data_size
  end_of_information = clear + 1
  available = clear + 2
  old_code = nullCode
  code_size = data_size + 1
  code_mask = (1 << code_size) - 1
  for (code = 0; code < clear; code++) {
    prefix[code] = 0
    suffix[code] = code
  }

  // Decode GIF pixel stream.
  var datum, bits, count, first, top, pi, bi
  datum = bits = count = first = top = pi = bi = 0
  for (i = 0; i < npix; ) {
    if (top === 0) {
      if (bits < code_size) {
        // get the next byte
        datum += data[bi] << bits

        bits += 8
        bi++
        continue
      }
      // Get the next code.
      code = datum & code_mask
      datum >>= code_size
      bits -= code_size
      // Interpret the code
      if (code > available || code == end_of_information) {
        break
      }
      if (code == clear) {
        // Reset decoder.
        code_size = data_size + 1
        code_mask = (1 << code_size) - 1
        available = clear + 2
        old_code = nullCode
        continue
      }
      if (old_code == nullCode) {
        pixelStack[top++] = suffix[code]
        old_code = code
        first = code
        continue
      }
      in_code = code
      if (code == available) {
        pixelStack[top++] = first
        code = old_code
      }
      while (code > clear) {
        pixelStack[top++] = suffix[code]
        code = prefix[code]
      }

      first = suffix[code] & 0xff
      pixelStack[top++] = first

      // add a new string to the table, but only if space is available
      // if not, just continue with current table until a clear code is found
      // (deferred clear code implementation as per GIF spec)
      if (available < MAX_STACK_SIZE) {
        prefix[available] = old_code
        suffix[available] = first
        available++
        if ((available & code_mask) === 0 && available < MAX_STACK_SIZE) {
          code_size++
          code_mask += available
        }
      }
      old_code = in_code
    }
    // Pop a pixel off the pixel stack.
    top--
    dstPixels[pi++] = pixelStack[top]
    i++
  }

  for (i = pi; i < npix; i++) {
    dstPixels[i] = 0 // clear missing pixels
  }

  return dstPixels
};

const parse = function(
  stream: Stream, 
  schema: any, 
  result: SchemaResult = {}, 
  parent: SchemaParent = null
) {
  parent = parent || result;

  if (Array.isArray(schema)) {
    schema.forEach(function (partSchema) {
      return parse(stream, partSchema, result, parent);
    });
  } else if (typeof schema === 'function') {
    schema(stream, result, parent, parse);
  } else {
    var key = Object.keys(schema)[0];

    if (Array.isArray(schema[key])) {
      parent[key] = {};
      parse(stream, schema[key], result, parent[key]);
    } else {
      parent[key] = schema[key](stream, result, parent, parse);
    }
  }

  return result;
};

const conditional = function(schema: any, conditionFunc: Function) {
  return function (
    stream: Stream, 
    result: SchemaResult, 
    parent: SchemaParent, 
    parse: Function
  ) {
    if (conditionFunc(stream, result, parent)) {
      parse(stream, schema, result, parent);
    }
  };
};

const loop = function(schema: any, continueFunc: Function) {
  return function (
    stream: Stream, 
    result: SchemaResult, 
    parent: SchemaParent, 
    parse: Function
  ) {
    var arr = [];

    while (continueFunc(stream, result, parent)) {
      var newParent = {};
      parse(stream, schema, result, newParent);
      arr.push(newParent);
    }

    return arr;
  };
};

const buildStream = function(uint8Data: Uint8Array): Stream {
  return {
    data: uint8Data,
    pos: 0
  };
};

const readByte = function() {
  return function (stream: Stream) {
    return stream.data[stream.pos++];
  };
};

const peekByte = function() {
  var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return function (stream: Stream) {
    return stream.data[stream.pos + offset];
  };
};

const readBytes = function(length: number) {
  return function (stream: Stream) {
    return stream.data.subarray(stream.pos, stream.pos += length);
  };
};

const peekBytes = function(length: number) {
  return function (stream: Stream) {
    return stream.data.subarray(stream.pos, stream.pos + length);
  };
};

const readString = function(length: number) {
  return function (stream: Stream) {
    return Array.from(readBytes(length)(stream)).map(function (value) {
      return String.fromCharCode(value);
    }).join('');
  };
};

const readUnsigned = function(littleEndian: boolean) {
  return function (stream: Stream) {
    var bytes = readBytes(2)(stream);
    return littleEndian ? (bytes[1] << 8) + bytes[0] : (bytes[0] << 8) + bytes[1];
  };
};

const readArray = function(
  byteSize: number, 
  totalOrFunc: number|Function
) {
  return function (stream: Stream, result: SchemaResult, parent: SchemaParent) {
    var total = typeof totalOrFunc === 'function' ? totalOrFunc(stream, result, parent) : totalOrFunc;
    var parser = readBytes(byteSize);
    var arr = new Array(total);

    for (var i = 0; i < total; i++) {
      arr[i] = parser(stream);
    }

    return arr;
  };
};

const subBitsTotal = function(
  bits: any[], 
  startIndex: number, 
  length: number
) {
  var result = 0;

  for (var i = 0; i < length; i++) {
    result += bits[startIndex + i] && Math.pow(2, length - i - 1);
  }

  return result;
};

const readBits = function(schema: any) {
  return function (stream: Stream) {
    var _byte = readByte()(stream); // convert the byte to bit array

    var bits = new Array(8);

    for (var i = 0; i < 8; i++) {
      bits[7 - i] = !!(_byte & 1 << i);
    } // convert the bit array to values based on the schema


    return Object.keys(schema).reduce(function (res: SchemaResult, key) {
      var def = schema[key];

      if (def.length) {
        res[key] = subBitsTotal(bits, def.index, def.length);
      } else {
        res[key] = bits[def.index];
      }

      return res;
    }, {});
  };
};

//GIF schema
const GIF = (() => {
  // a set of 0x00 terminated subblocks
  const subBlocksSchema = {
    blocks: (stream: Stream) => {
      const terminator = 0x00
      const chunks = []
      const streamSize = stream.data.length
      var total = 0
      for (
        var size = readByte()(stream);
        size !== terminator;
        size = readByte()(stream)
      ) {
        // size becomes undefined for some case when file is corrupted and  terminator is not proper 
        // null check to avoid recursion
        if(!size) break;
        // catch corrupted files with no terminator
        if (stream.pos + size >= streamSize) {
          const availableSize = streamSize - stream.pos
          chunks.push(readBytes(availableSize)(stream))
          total += availableSize
          break
        }
        chunks.push(readBytes(size)(stream))
        total += size
      }
      const result = new Uint8Array(total)
      var offset = 0
      for (var i = 0; i < chunks.length; i++) {
        result.set(chunks[i], offset)
        offset += chunks[i].length
      }
      return result
    },
  }

  // global control extension
  const gceSchema = conditional(
    {
      gce: [
        { codes: readBytes(2) },
        { byteSize: readByte() },
        {
          extras: readBits({
            future: { index: 0, length: 3 },
            disposal: { index: 3, length: 3 },
            userInput: { index: 6 },
            transparentColorGiven: { index: 7 },
          }),
        },
        { delay: readUnsigned(true) },
        { transparentColorIndex: readByte() },
        { terminator: readByte() },
      ],
    },
    (stream: Stream) => {
      var codes = peekBytes(2)(stream)
      return codes[0] === 0x21 && codes[1] === 0xf9
    }
  )

  // image pipeline block
  const imageSchema = conditional(
    {
      image: [
        { code: readByte() },
        {
          descriptor: [
            { left: readUnsigned(true) },
            { top: readUnsigned(true) },
            { width: readUnsigned(true) },
            { height: readUnsigned(true) },
            {
              lct: readBits({
                exists: { index: 0 },
                interlaced: { index: 1 },
                sort: { index: 2 },
                future: { index: 3, length: 2 },
                size: { index: 5, length: 3 },
              }),
            },
          ],
        },
        conditional(
          {
            lct: readArray(3, (stream: Stream, result: SchemaResult, parent: SchemaParent) => {
              return Math.pow(2, (parent?.descriptor.lct.size || 0) + 1)
            }),
          },
          (stream: Stream, result: SchemaResult, parent: SchemaParent) => {
            return parent?.descriptor.lct.exists
          }
        ),
        { data: [{ minCodeSize: readByte() }, subBlocksSchema] },
      ],
    },
    (stream: Stream) => {
      return peekByte()(stream) === 0x2c
    }
  )

  // plain text block
  const textSchema = conditional(
    {
      text: [
        { codes: readBytes(2) },
        { blockSize: readByte() },
        {
          preData: (stream: Stream, result: SchemaResult, parent: SchemaParent) =>
            readBytes(parent?.text.blockSize || 0)(stream),
        },
        subBlocksSchema,
      ],
    },
    (stream: Stream) => {
      var codes = peekBytes(2)(stream)
      return codes[0] === 0x21 && codes[1] === 0x01
    }
  )

  // application block
  const applicationSchema = conditional(
    {
      application: [
        { codes: readBytes(2) },
        { blockSize: readByte() },
        { 
          id: (
            stream: Stream, 
            result: SchemaResult, 
            parent: SchemaParent
          ) => readString(parent?.blockSize || 0)(stream) 
        },
        subBlocksSchema,
      ],
    },
    (stream: Stream) => {
      var codes = peekBytes(2)(stream)
      return codes[0] === 0x21 && codes[1] === 0xff
    }
  )

  // comment block
  const commentSchema = conditional(
    {
      comment: [{ codes: readBytes(2) }, subBlocksSchema],
    },
    (stream: Stream) => {
      var codes = peekBytes(2)(stream)
      return codes[0] === 0x21 && codes[1] === 0xfe
    }
  )

  const schema = [
    { 
      header: [
        { signature: readString(3) }, 
        { version: readString(3) }
      ] 
    },
    {
      lsd: [
        { width: readUnsigned(true) },
        { height: readUnsigned(true) },
        {
          gct: readBits({
            exists: { index: 0 },
            resolution: { index: 1, length: 3 },
            sort: { index: 4 },
            size: { index: 5, length: 3 },
          }),
        },
        { backgroundColorIndex: readByte() },
        { pixelAspectRatio: readByte() },
      ],
    },
    conditional(
      {
        gct: readArray(3, (stream: Stream, result: SchemaResult) =>
          Math.pow(2, result.lsd.gct.size + 1)
        ),
      },
      (stream: Stream, result: SchemaResult) => result.lsd.gct.exists
    ),
    // content frames
    {
      frames: loop(
        [gceSchema, applicationSchema, commentSchema, imageSchema, textSchema],
        (stream: Stream) => {
          var nextCode = peekByte()(stream)
          // rather than check for a terminator, we should check for the existence
          // of an ext or image block to avoid infinite loops
          //var terminator = 0x3B;
          //return nextCode !== terminator;
          return nextCode === 0x21 || nextCode === 0x2c
        }
      ),
    },
  ]

  return schema
})();

const generatePatch = (image: ImageResultData) => {
  const totalPixels = image.pixels.length
  const patchData = new Uint8ClampedArray(totalPixels * 4)
  for (var i = 0; i < totalPixels; i++) {
    const pos = i * 4
    const colorIndex = image.pixels[i]
    const color = image.colorTable[colorIndex] || [0, 0, 0]
    patchData[pos] = color[0]
    patchData[pos + 1] = color[1]
    patchData[pos + 2] = color[2]
    patchData[pos + 3] = colorIndex !== image.transparentIndex ? 255 : 0
  }

  return patchData
};

export const parseGIF = (arrayBuffer: ArrayBuffer) => {
  const byteData = new Uint8Array(arrayBuffer)
  return parse(buildStream(byteData), GIF)
};

export const decompressFrame = (
  frame: ImageFrame, 
  gct: number[][], 
  buildImagePatch: boolean
) => {
  if (!frame.image) {
    console.warn('gif frame does not have associated image.')
    return
  }

  const { image } = frame

  // get the number of pixels
  const totalPixels = image.descriptor.width * image.descriptor.height
  // do lzw decompression
  var pixels = lzw(image.data.minCodeSize, image.data.blocks, totalPixels)

  // deal with interlacing if necessary
  if (image.descriptor.lct.interlaced) {
    pixels = deinterlace(pixels, image.descriptor.width)
  }

  const resultImage: ImageResultData = {
    pixels: pixels,
    dims: {
      top: frame.image.descriptor.top,
      left: frame.image.descriptor.left,
      width: frame.image.descriptor.width,
      height: frame.image.descriptor.height
    },
    colorTable: []
  }

  // color table
  if (image.descriptor.lct && image.descriptor.lct.exists) {
    resultImage.colorTable = image.lct
  } else {
    resultImage.colorTable = gct
  }

  // add per frame relevant gce information
  if (frame.gce) {
    resultImage.delay = (frame.gce.delay || 10) * 10 // convert to ms
    resultImage.disposalType = frame.gce.extras.disposal
    // transparency
    if (frame.gce.extras.transparentColorGiven) {
      resultImage.transparentIndex = frame.gce.transparentColorIndex
    }
  }

  // create canvas usable imagedata if desired
  if (buildImagePatch) {
    resultImage.patch = generatePatch(resultImage)
  }

  return resultImage
};

export const decompressFrames = (parsedGif: ImageFrames, buildImagePatches: boolean) => {
  return parsedGif.frames
    .filter(f => f.image)
    .map(f => decompressFrame(f, parsedGif.gct, buildImagePatches))
};

export const makeCanvas = function(frame: ImageFrame) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  const { width, height } = frame.dims;

  canvas.width = width;
  canvas.height = height;

  const image = context.createImageData(width, height);

  return { canvas, context, image };
};

export const makeImage = async (src: string): Promise<HTMLImageElement> => {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = _ => resolve(image);
    image.setAttribute('crossOrigin', '');
    image.src = src;
  });
};

export const drawPatch = function(previous: CanvasStruct, frame: ImageFrame) {
  const { top, left } = frame.dims

  // set the patch data as an override
  previous.image.data.set(frame.patch)

  // draw the patch back over the canvas
  previous.context.putImageData(previous.image, top, left)
};

export const getAllFramesData = async (frames: ImageFrame[], faces: any[]) => {
  //make a master frame
  const master = makeCanvas(frames[0])
  const allFramesData = []
  for (let i = 0; i < frames.length; i++) {
    //draw frame on top of the master frame
    drawPatch(master, frames[i])
    //copy the master canvas to the active one
    const canvas = copyCanvas(master.canvas, cloneCanvas(master.canvas))
    allFramesData.push({ canvas, frame: frames[i], faces: faces[i] })
  }

  return allFramesData
}

const copyCanvas = (source: HTMLCanvasElement, destination: HTMLCanvasElement) => {
  // draw source over the destination canvas
  //@ts-ignore
  destination.getContext('2d').drawImage(source, 0, 0)
  return destination
}

const cloneCanvas = (source: HTMLCanvasElement) => {
  const canvas = document.createElement('canvas')
  //get the dims
  canvas.width = source.width
  canvas.height = source.height
  // draw source over the destination canvas
  //@ts-ignore
  canvas.getContext('2d').drawImage(source, 0, 0)
  return canvas
}