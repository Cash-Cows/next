export type Coordinates = {
  x: number,
  y: number,
  width: number,
  height: number
};

export type SearchQuery = {
  q: string|null,
  start: number,
  range: number
};

export type SearchResult = {
  id: string,
  cid: string,
  url: string,
  description: string,
  tags: string[],
  up: string,
  down: string,
  data: Coordinates[][],
  created: string,
  updated: string
};

export type Stream = {
  data: Uint8Array,
  pos: number
};

export type SchemaResult = Record<string, any>;
export type SchemaParent = Record<string, any>|null;

export type ImageData = Record<string, any> & {
  descriptor: {
    width: number,
    height: number,
    top: number,
    left: number,
    lct: any
  },
  data: {
    minCodeSize: number,
    blocks: number[]
  },
  lct: any
};

export type ImageFrame = Record<string, any> & { 
  image: ImageData,
  dims: {
    top: number,
    left: number,
    width: number,
    height: number
  },
  gce: {
    delay: number,
    extras: {
      disposal: any,
      transparentColorGiven: boolean
    },
    transparentColorIndex: number
  }
};

export type ImageFrames = Record<string, any> & { 
  gct: number[][], 
  frames: ImageFrame[] 
};

export type ImageResultData = Record<string, any> & {
  pixels: number[],
  dims: {
    top: number,
    left: number,
    width: number,
    height: number
  },
  colorTable: number[][]
};

export type CanvasStruct = { 
  canvas: HTMLCanvasElement, 
  context: CanvasRenderingContext2D, 
  image: globalThis.ImageData
};

export type MemeProps = { 
  className?: string,
  data: MemeResult, 
  address: string|undefined 
};

export type MemeResult = {
  id: number,
  up: number,
  description: string,
  name: string,
  down: number,
  image: string
};

export type MemeStates = {
  q: string|null,
  start: number,
  range: number,
  loading: boolean,
  next: boolean,
  results: MemeResult[]
};