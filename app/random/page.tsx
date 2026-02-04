"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { animeImages, AnimeImage } from "@/lib/anime-data";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomImage } from "@/components/image";
import {
  Heart,
  Eye,
  Shuffle,
  ExternalLink,
  Calendar,
  User,
  Sparkles,
} from "lucide-react";

export default function RandomPage() {
  const [currentImage, setCurrentImage] = useState<AnimeImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<AnimeImage[]>([]);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * animeImages.length);
    return animeImages[randomIndex];
  };

  const handleRandomize = () => {
    setIsLoading(true);

    // Add current image to history
    if (currentImage) {
      setHistory((prev) => [currentImage, ...prev].slice(0, 5));
    }

    // Simulate loading for better UX
    setTimeout(() => {
      setCurrentImage(getRandomImage());
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    setCurrentImage(getRandomImage());
  }, []);

  if (!currentImage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">
          <Shuffle className="h-12 w-12 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute top-10 right-1/4 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Random Discovery
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Discover Something New
              </h1>
              <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                Let fate guide you to beautiful artwork. Click the button to
                discover a random piece.
              </p>
            </div>

            {/* Randomize Button */}
            <div className="flex justify-center mb-12">
              <Button
                size="lg"
                onClick={handleRandomize}
                disabled={isLoading}
                className="px-8 py-6 text-lg"
              >
                <Shuffle
                  className={`h-5 w-5 mr-2 ${isLoading ? "animate-spin" : ""}`}
                />
                {isLoading ? "Shuffling..." : "Randomize"}
              </Button>
            </div>

            {/* Current Random Image */}
            <div
              className={`transition-opacity duration-300 ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-card border border-border group">
                  <CustomImage
                    alt={currentImage.description || currentImage.title}
                    title={currentImage.description || currentImage.title}
                    dataId={currentImage.id}
                    dataSize={currentImage.size}
                    dataAuthorId={currentImage.author_id}
                    dataCategory={currentImage.category}
                    dataDatetime={currentImage.date_time}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    src={`${currentImage.src}${process.env.NEXT_PUBLIC_DETAIL_BILI_IMG_QUALITY}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                    {/* {currentImage.title} */}
                  </h2>

                  {/* Artist */}
                  <div className="flex items-center gap-3 mt-4">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">UId</p>
                      <p className="font-medium text-foreground">
                        {currentImage.author_id}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mt-6 py-4 border-y border-border">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-accent fill-accent" />
                      <span className="font-semibold text-foreground">{0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-muted-foreground" />
                      <span className="font-semibold text-foreground">{0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {new Date(
                          currentImage.date_time * 1000,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {currentImage.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {currentImage?.tags?.map((tag) => (
                      <Link key={tag} href={`/search?tag=${tag}`}>
                        <Badge
                          variant="secondary"
                          className="px-3 py-1.5 cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors"
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <div className="mt-6">
                    <Button asChild variant="outline">
                      <Link href={`/image/${currentImage.title}`}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        {history.length > 0 && (
          <section className="py-12 bg-card/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Recently Viewed
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {history.map((image, index) => (
                  <Link
                    key={`${image.id}-${index}`}
                    href={`/image/${image.title}`}
                    className="group relative aspect-square rounded-lg overflow-hidden bg-card border border-border"
                  >
                    <CustomImage
                      src={`${image.src}${process.env.NEXT_PUBLIC_DETAIL_BILI_IMG_QUALITY}`}
                      alt={image.description || image.title}
                      title={image.description || image.title}
                      dataId={image.id}
                      dataSize={image.size}
                      dataAuthorId={image.author_id}
                      dataCategory={image.category}
                      dataDatetime={image.date_time}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-sm font-medium text-foreground">
                        View
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
