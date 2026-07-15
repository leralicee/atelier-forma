'use client';

import { useState } from 'react';
import type { ImageAsset } from '@/lib/content';

interface SiteImageProps {
  image: ImageAsset;
  className?: string;
  priority?: boolean;
  sizes?: string;

  mono?: boolean;
}

export default function SiteImage({
  image,
  className = '',
  priority = false,
  sizes,
  mono = false,
}: SiteImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-concrete-2 ${className}`}>
      {!failed ? (
        <img
          src={image.src}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...(priority ? { fetchPriority: 'high' as const } : {})}
          sizes={sizes}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${mono ? 'grayscale' : ''}`}
        />
      ) : (
        <div role="img" aria-label={image.alt} className="absolute inset-0 bg-concrete-2" />
      )}
    </div>
  );
}
