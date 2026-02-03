"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { AnimeImage } from "@/lib/anime-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  image: AnimeImage;
  priority?: boolean;
  className?: string;
}

export function ImageCard({
  image,
  priority = false,
  className,
}: ImageCardProps) {
  return (
    <Link
      href={`/image/${image.title}`}
      className={cn(
        "group relative block overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        className,
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={image.description || image.title}
          src={`/api/bili-img?url=${encodeURIComponent(image.src)}` || "/placeholder.svg"}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Stats */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-foreground/90">
              <Heart className="h-3.5 w-3.5 fill-accent text-accent" />
              {0}
            </span>
            <span className="flex items-center gap-1 text-xs text-foreground/90">
              <Eye className="h-3.5 w-3.5" />
              {0}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {image.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          by {image.author_id}
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
