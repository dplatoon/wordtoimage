
import { Helmet } from 'react-helmet-async';

export const SeoHead = () => {
  return (
    <Helmet>
      <title>WordToImage - Transform Text Into Images with AI | WordToImage</title>
      <meta name="description" content="Turn your ideas into vivid images in seconds—no design skills needed. Create professional-looking visuals for social media, presentations, or inspiration." />
      <meta property="og:url" content="https://wordtoimage.com" />
      <meta property="og:title" content="WordToImage: AI Text-to-Image Generator" />
      <meta property="og:description" content="Create stunning visuals in seconds from text prompts. Free to try, no credit card required." />
      <meta property="og:image" content="https://wordtoimage.com/home-og.png" />
      <meta name="twitter:image" content="https://wordtoimage.com/home-og.png" />
    </Helmet>
  );
};
