import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  url, 
  image = "https://spice-workshop.github.io/assets/HeaderImage.jpeg", 
  type = "website",
  children 
}) => {
  const siteName = "SPiCE 2 Conference";
  const twitterHandle = "@CRAL_Lyon"; // Assuming this handle based on affiliation, can be updated.

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {children}
    </Helmet>
  );
};

export default SEO;
