import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type NavProps = {
  id: number,
  active?: boolean,
  slug: string,
  title: string,
  date: string
};

export type PostProps = NavProps & {
  image?: string,
  summary: string,
  content: MDXRemoteSerializeResult<
    Record<string, unknown>, 
    Record<string, string>
  >
};

export type PageProps = PostProps & {
  nav: NavProps[],
  prev?: NavProps,
  next?: NavProps
};
