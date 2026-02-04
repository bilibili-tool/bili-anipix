"use client";

import Link from "next/link";
// import { Heart, Eye } from "lucide-react";
import { AnimeImage } from "@/lib/anime-data";
import { Badge } from "@/components/ui/badge";
import { CustomImage } from "@/components/image";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  image: AnimeImage;
  className?: string;
  returnUrl?: string;
}

export function ImageCard({ image, className, returnUrl }: ImageCardProps) {
  const href = returnUrl 
    ? `/image/${image.title}?from=${(returnUrl)}`
    : `/image/${image.title}`;
    
  return (
    <Link
      href={href}
      className={cn(
        "relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        className,
      )}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[500px]">
        <CustomImage
          alt={image.description || image.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105 lg:aspect-auto w-full h-full"
          dataId={image.id}
          dataSize={image.size}
          dataAuthorId={image.author_id}
          dataCategory={image.category}
          dataDatetime={image.date_time}
          src={`${image.src}${process.env.NEXT_PUBLIC_LIST_BILI_IMG_QUALITY}`}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          title={image.description || image.title}
        />

        {/* Stats */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-3">
            {/* <span className="flex items-center gap-1 text-xs text-foreground/90">
              <Heart className="h-3.5 w-3.5 fill-accent text-accent" />
              {0}
            </span>
            <span className="flex items-center gap-1 text-xs text-foreground/90">
              <Eye className="h-3.5 w-3.5" />
              {0}
            </span> */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {image.description}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          UId: {image.author_id}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Published at :{" "}
          {new Date(image.date_time * 1000).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </p>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {image?.tags?.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs px-2 py-0.5 bg-secondary/80 hover:bg-primary/20 hover:text-primary transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
