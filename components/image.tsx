"use client";
import { useState } from "react";

interface ImageProps {
  alt?: string;
  src: string | "";
  title?: string | "";
  className?: string;
  dataId?: string | number;
  dataAuthorId?: string | number;
  dataCategory?: string;
  dataSize?: string | number;
  dataDatetime?: string | number;
}

export function CustomImage({
  alt,
  src,
  title,
  className,
  dataId,
  dataAuthorId,
  dataCategory,
  dataSize,
  dataDatetime,
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const resolvedSrc = `${process.env.NEXT_PUBLIC_BILI_IMG_PROXY_URL}?url=${src}`;
  const fallbackSrc = "/placeholder.svg";

  return (
    <>
      <img
        src={hasError ? fallbackSrc : resolvedSrc}
        alt={alt}
        title={title || alt}
        className={className}
        loading="lazy"
        decoding="async"
        data-id={dataId}
        data-author_id={dataAuthorId}
        data-category={dataCategory}
        data-size={dataSize}
        data-datetime={dataDatetime}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
      {isLoading && <div className="image-loading">Loading...</div>}
    </>
  );
}
