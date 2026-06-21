// components/ImageWithSafeError.js
import React, { useState } from 'react';

const ImageWithSafeError = ({ 
  src, 
  alt, 
  className, 
  fallbackSrc, 
  fallbackIcon,
  ...props 
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    if (fallbackIcon) {
      return <span className={className}>{fallbackIcon}</span>;
    }
    return <img 
      src={fallbackSrc || '/placeholder-image.jpg'} 
      alt={alt} 
      className={className} 
      {...props} 
    />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      onLoad={() => setLoaded(true)}
      {...props}
    />
  );
};

export default ImageWithSafeError;