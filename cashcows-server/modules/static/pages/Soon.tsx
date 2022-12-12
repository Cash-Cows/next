//components
import { HTMLHead, PaperBox } from 'modules/common';
//config
import { cdn, host } from 'project.config';

export const Head = () => (
  <HTMLHead>
    <title>Coming Soon | Cash Cows Club</title>
    <meta name="description" content="This section is still a work in progress, stay tuned!" />
    
    <meta property="og:title" content="Coming Soon | Cash Cows Club" />
    <meta property="og:description" content="This section is still a work in progress, stay tuned!" />
    <meta property="og:image" content={`https://${cdn}/website/images/banner/banner-home.png`} />
    <meta property="og:url" content={`https://${host}/`} />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@wearecashcows" />
    <meta name="twitter:title" content="Coming Soon | Cash Cows Club" />
    <meta name="twitter:description" content="This section is still a work in progress, stay tuned!" />
    <meta name="twitter:image" content={`https://${cdn}/website/images/banner/banner-home.png`} />
  </HTMLHead>
);

export const Body = () => (
  <main className="h-full relative flex justify-center items-center bg-soon bg-cover bg-bottom">
    <PaperBox className="text-2xl font-bold px-16 py-8">Coming Soon!</PaperBox>
  </main>
);