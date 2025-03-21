'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
}

export function Avatar({ className, src, alt, fallback, ...props }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className={cn("relative h-10 w-10 rounded-full overflow-hidden", className)} {...props}>
      {src && !imgError ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
          {fallback || alt?.charAt(0) || 'U'}
        </div>
      )}
    </div>
  );
}
