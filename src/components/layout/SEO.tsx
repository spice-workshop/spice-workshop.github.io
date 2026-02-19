import type { FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  imageWidth?: string;
  imageHeight?: string;
  type?: string;
  keywords?: string;
  children?: ReactNode;
}

const SEO: FC<SEOProps> = ({ 
  title, 
  description, 
  url, 
  image = "https://spice-workshop.github.io/assets/HeaderImage.jpeg",
  imageWidth = "1200",
  imageHeight = "630",
  type = "website",
  keywords = "SPiCE, Star formation, Planet formation, Astrophysics, Conference, Workshop, Lyon, CRAL, ENS de Lyon, Simulations",
  children 
}) => {
  const siteName = "SPiCE 2 Conference";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {children}
    </Helmet>
  );
};

export default SEO;
