import Head from 'next/head';

interface Props {
  title?: string;
}

function SEO({ title }: Props) {
  const pageTitle = title ? `${title} — Hexagon` : 'Hexagon';

  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
}

export default SEO;
