//hooks
import React from 'react';
import { useWeb3 } from 'modules/web3';
import { useMemesFetch } from '../hooks';
//components
import { HTMLHead, Heading } from 'modules/ui';
import { Meme } from '../components';
//config
import { cdn, host } from 'project.config';

const randomCow = () => {
  const edition = Math.floor(Math.random() * 4030) + 1;
  const level = Math.floor(Math.random() * 2);
  return `https://${cdn}/crew/headshots/${edition}_${level}.png`;
}

export const Head = () => (
  <HTMLHead>
    <title>Animated GIF Cow Memes Database | Cash Cows Club</title>
    <meta name="description" content="Your top source for the best cow based animated GIF memes. Find funny memes, unique memes and more." />
    
    <meta property="og:title" content="Animated GIF Cow Memes Database | Cash Cows Club" />
    <meta property="og:description" content="Your top source for the best cow based animated GIF memes. Find funny memes, unique memes and more." />
    <meta property="og:image" content={`https://${cdn}/website/images/banner/banner-memes.png`} />
    <meta property="og:url" content={`https://${host}/`} />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@wearecashcows" />
    <meta name="twitter:title" content="Animated GIF Cow Memes Database | Cash Cows Club" />
    <meta name="twitter:description" content="Your top source for the best cow based animated GIF memes. Find funny memes, unique memes and more." />
    <meta name="twitter:image" content={`https://${cdn}/website/images/banner/banner-memes.png`} />
  </HTMLHead>
);

export const Body = () => {
  //hooks
  const { 
    filter, 
    loading, 
    results, 
    q, 
    start, 
    range,
    next,
    tasks
  } = useMemesFetch(randomCow);
  const { account } = useWeb3();
  //refs
  const input = React.createRef<HTMLInputElement>();

  //search on submit
  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filter(input.current?.value || null);
    return false;
  };

  //paginate on click
  const paginate = () => filter(q, start + range);

  return (
    <main className="h-full relative overflow-auto">
      <div className="container max-w-4xl m-auto">
        <Heading level="1" size="lg" className="pt-12 pb-4 mx-3 uppercase">
          Cow Memes Database
        </Heading>
        <form className="flex mx-3" onSubmit={search}>
          <input ref={input} className="flex-grow py-2 px-4 text-black" placeholder="Search for Memes" type="text" />
          <button className="bg-yellow-500 py-2 px-4">
            Search
          </button>
        </form>
        <div className="flex flex-wrap justify-center mx-1 mb-12">
          {results.map((row, i) => (
            <Meme key={i} data={row} address={account.address} className="mt-4" />
          ))}
        </div>
        {tasks.length > 0 && (
          <div className="mx-3 mt-4 mb-12 p-4 border border-white text-center">
            Loading...
          </div>
        )}
        {tasks.length == 0 && next && (
          <div className="mx-3 mt-4 mb-12 p-4 border border-white text-center cursor-pointer" onClick={paginate}>
            More Results
          </div>
        )}
      </div>
    </main>
  );
};