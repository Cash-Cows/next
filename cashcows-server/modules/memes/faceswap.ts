import type { SearchResult, ImageFrame, ImageFrames } from './types';
import { 
  makeImage, 
  parseGIF, 
  decompressFrames, 
  getAllFramesData 
} from './parser';

import gifmaker from 'gif.js';

const faceswap = async (meme: SearchResult, face: string): Promise<Blob|false> => {
  const image = await makeImage(face);
  //parse gif
  const gif = await fetch(meme.url)
    .then(response => response.arrayBuffer())
    .then(buffer => parseGIF(buffer))
  
  //get gif frames
  const frames = decompressFrames(gif as ImageFrames, true)
  //if no frames return false
  if (!frames.length) return false
  //get all frames data
  //@ts-ignore
  const framesData = await getAllFramesData(frames, meme.data)
  //initialze the animation
  const animation = new gifmaker({
    workerScript: '/scripts/gifworker.js',
    workers: 2,
    quality: 10
  })

  for (const frameData of framesData) {
    if (Array.isArray(frameData.faces)) {
      for (let i = 0; i < frameData.faces.length; i++) {
        //this is a test that draws a box
        //(new faceapi.draw.DrawBox(resized)).draw(active)
        //@ts-ignore
        frameData.canvas.getContext('2d').drawImage(
          image, 
          0, 0, image.width, image.height,
          frameData.faces[i].x,
          frameData.faces[i].y,
          frameData.faces[i].width,
          frameData.faces[i].height
        );
      }
    }

    if (frameData.frame.delay) {
      animation.addFrame(frameData.canvas, {delay: frameData.frame.delay});
    } else {
      animation.addFrame(frameData.canvas);
    }
  }

  return await new Promise(resolve => {
    animation.on('finished', blob => resolve(blob))
    try {
      animation.render();
    } catch(e) {
      console.log('skipped', meme.url)
      resolve(false)
    }
  });
};

export default faceswap;