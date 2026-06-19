import { Helmet } from 'react-helmet-async';
import Hero from './Hero';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>John Paul Uzowuru | Portfolio — Frontend Developer & Electrical Engineer</title>
        <meta name="description" content="Personal portfolio of a recent Electrical Engineering graduate passionate about frontend development, smart grids, and automation systems." />
        <meta property="og:title" content="John Paul Uzowuru | Portfolio — Frontend Developer & Electrical Engineer" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Hero />
    </>
  );
}
