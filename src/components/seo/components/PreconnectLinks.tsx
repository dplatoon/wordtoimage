
import { Helmet } from 'react-helmet-async';

export const PreconnectLinks = () => {
  return (
    <Helmet>
      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for performance */}
      <link rel="dns-prefetch" href="//api.wordtoimage.com" />
      <link rel="dns-prefetch" href="//cdn.wordtoimage.com" />
    </Helmet>
  );
};
