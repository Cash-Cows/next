//types
import type { PageProps } from '../types';
//components
import { Head, Body, getPosts } from './Post';

export { Head, Body };

export const getStaticProps = async () => {
  const posts = await getPosts();
  if (!posts.length) {
    return { props: { nav: [] } };
  }

  const post = posts[posts.length - 1];
  if (!post) {
    return { props: { nav: [] } };
  }

  const nav = posts.map((post, i) => ({ 
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.date,
    active: i === (posts.length - 1)
  }));

  const props: PageProps = { nav, ...post }

  const prev = posts.filter((post, i) => post.slug === posts[i - 1]?.slug)[0];
  if (prev) {
    props.prev = prev;
  }
  const next = posts.filter((post, i) => post.slug === posts[i + 1]?.slug)[0];
  if (next) {
    props.next = next;
  }

  return { props };
};