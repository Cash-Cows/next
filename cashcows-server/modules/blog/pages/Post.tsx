//types
import type { GetStaticProps } from 'next';
import type { PageProps, PostProps } from '../types';
//components
import { 
  HTMLHead, 
  Heading, 
  H1, H2, H3, 
  H4, H5, H6,
  List, ListItem,
  Link as Alink,
  Blockquote,
  Text,
  Image
} from 'modules/ui';
import Link from 'next/link';
import { TwitterTweetEmbed } from 'react-twitter-embed';
//config
import { host } from 'project.config';
//others
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

export const Head: React.FC<PageProps> = props => {
  const { slug, image, title, summary } = props;
  return (
    <HTMLHead>
      <title>{title} | Cash Cows Club</title>
      <meta name="description" content={summary} />
      <link rel="canonical" href={`https://${host}/updates/${slug}`} />
      
      <meta property="og:title" content={`${title} | Cash Cows Club`} />
      <meta property="og:description" content={summary} />
      {image && <meta property="og:image" content={image} />}
      
      <meta property="og:url" content={`https://${host}/updates/${slug}`} />
      <meta property="og:type" content="website" />
  
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@wearecashcows" />
      <meta name="twitter:title" content={`${title} | Cash Cows Club`} />
      <meta name="twitter:description" content={summary} />
      {image && <meta name="twitter:image" content={image} />}
    </HTMLHead>
  );
};

export const Body: React.FC<PageProps> = props => {
  const { nav, prev, next, image, title, date, content } = props;
  return (
    <section className="h-full relative overflow-auto">
      <div className="max-w-4xl px-3 m-auto py-12 md:flex">
        <aside className="basis-1/3">
          {nav.reverse().map(post => (
            <Link key={post.id} href={`/updates/${post.slug}`} className={`block px-4 py-3 mr-3 mb-3 border ${post.active? 'border-gray-400': 'border-gray-700 text-gray-400'}`}>
              <em className="italic text-xs">{post.date}</em>
              <span className="block">{post.title}</span>
            </Link>
          ))}
        </aside>
        <main className="basis-2/3">
          <div className="block">
            {image && <img alt={title} src={image} className="w-full" />}
          </div>
          <em className="block pt-4 text-sm">{date}</em>
          <Heading level="1" className="pb-4">{title}</Heading>
          <div>
            <MDXRemote {...content} components={{
              h1: H1, h2: H2, 
              h3: H3, h4: H4, 
              h5: H5, h6: H6,
              ul: List, 
              li: ListItem,
              blockquote: Blockquote,
              p: Text,
              img: Image,
              a: Alink,
              TwitterTweetEmbed
            }} />
          </div>
          {prev && (
            <Link key={prev.id} href={`/updates/${prev.slug}`} className={`inline-block px-4 py-3 mr-3 mb-3 border border-gray-400`}>
              <i className="fas fa-chevron-left"></i>
              <span className="inline-block ml-2">{prev.date} - {prev.title}</span>
            </Link>
          )}
          {next && (
            <Link key={next.id} href={`/updates/${next.slug}`} className={`inline-block px-4 py-3 mr-3 mb-3 border border-gray-400`}>
              <span className="inline-block mr-2">{next.date} - {next.title}</span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          )}
        </main>
      </div>
    </section>
  );
};

const posts: PostProps[] = [];

export const getPosts = async() => {
  if (!posts.length) {
    const files = fs.readdirSync(
      path.resolve(process.cwd(), 'posts')
    );

    for (const name of files) {
      const slug = name.replace('.mdx', '');
      const mdx = fs.readFileSync(path.join(`posts/${slug}.mdx`), 'utf8');
      const { data, content } = matter(mdx);
      const { id, image, title, date, summary } = data;
      posts.push({
        id,
        slug,
        image,
        title,
        date,
        summary,
        content: await serialize(content)
      });
    }

    posts.sort((a, b) => a.id - b.id)
  }

  return posts;
};

export const getStaticPaths = async () => {
  const posts = await getPosts();
  const paths = posts.map(post => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return { props: { nav: [] } };
  }

  const posts = await getPosts();
  const post = posts.filter(post => params.slug === post.slug)[0];
  if (!post) {
    return { props: { nav: [] } };
  }

  const nav = posts.map(post => ({ 
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.date,
    active: params.slug === post.slug 
  }));

  const props: PageProps = { nav, ...post }

  const prev = posts.filter((post, i) => params.slug === posts[i - 1]?.slug)[0];
  if (prev) {
    props.prev = prev;
  }
  const next = posts.filter((post, i) => params.slug === posts[i + 1]?.slug)[0];
  if (next) {
    props.next = next;
  }

  return { props };
};