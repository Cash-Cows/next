//types
import type { MemeProps } from '../types';
//enums
import { BadgeTypes, BadgeLayouts } from 'modules/common/enums';
//hooks
import { useState } from 'react';
//components
import { Badge, notify } from 'modules/common';
//config
import { api } from 'project.config';
//others
import axios from 'axios';

const Meme: React.FC<MemeProps> = ({ data, address, className }) => {
  //hooks
  const [ votes, add ] = useState({ up: data.up, down: data.down });
  //vote up on click
  const voteUp = async() => {
    if (!address) {
      return notify('error', 'You must connect your wallet first.');
    }

    const response = await axios.get(
      `https://${api}/meme/vote.php?id=${data.id}&address=${address.substring(2)}&up=1`
    );
    
    if (response.data.error) {
      return notify('error', response.data.message);
    }

    add({ ...votes, up: parseInt(String(votes.up)) + 1 });
  }
  //vote down on click
  const voteDown = async() => {
    if (!address) {
      return notify('error', 'You must connect your wallet first.');
    }

    const response = await axios.get(
      `https://${api}/meme/vote.php?id=${data.id}&address=${address.substring(2)}&down=1`
    );
    
    if (response.data.error) {
      return notify('error', response.data.message);
    }

    add({ ...votes, down: parseInt(String(votes.down )) + 1 });
  }

  return (
    <div className={className}>
      <div className="mx-2">
        <img alt={data.description} src={data.image} className="w-auto h-52" />
        <div className="flex justify-center items-center mt-3">
          <a className="text-yellow-600 inline-block leading-5 cursor-pointer" onClick={voteUp}>
            <Badge type={BadgeTypes.WARNING} layout={BadgeLayouts.SOLID} className="rounded-lg">
              {votes.up}
            </Badge>
            <i className="fas fa-thumbs-up inline-block ml-2"></i>
          </a>
          <a className="text-red-800 mx-3 inline-block leading-5 cursor-pointer" onClick={voteDown}>
            <Badge type={BadgeTypes.ERROR} layout={BadgeLayouts.SOLID} className="rounded-lg">
              {votes.down}
            </Badge>
            <i className="fas fa-thumbs-down inline-block ml-2"></i>
          </a>
          <a className="text-gray-200 leading-5 cursor-pointer" href={data.image} download={`Cash-Cows-${data.name}.gif`} target="_blank">
            <i className="fas fa-download inline-block"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Meme;