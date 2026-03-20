import * as React from "react";

export function PostImageFrame({
  imageSrc,
  alt,
  emptyLabel,
}: {
  imageSrc?: string | null;
  alt: string;
  emptyLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-foreground/10 bg-secondary/20">
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={alt}
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center px-3 text-center text-xs text-muted-foreground">
          {emptyLabel}
        </div>
      )}
    </div>
  );
}

