"use client";

import { useState } from "react";
import { animeImages, getAllTags } from "@/lib/anime-data";
import { ImageCard } from "@/components/image-card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Pagination } from "@/components/pagination";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 27;

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);

  // const featuredImages = animeImages.slice(0, 3);
  // const popularTags = getAllTags().slice(0, 8);

  // Pagination logic
  const totalPages = Math.ceil(animeImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedImages = animeImages.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to gallery section
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Discover Beautiful Artwork
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
                Immerse Yourself in
                <span className="block text-primary mt-2">Animation Art</span>
              </h1>

              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Explore stunning anime-inspired artwork from talented artists
                around the world. Find your next favorite piece or discover
                something completely new.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="px-8" asChild>
                  <Link href="/search">
                    Start Exploring
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 bg-transparent"
                  asChild
                >
                  <Link href="/random">Random Discovery</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        {/* <section className="py-16 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Featured</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredImages.map((image, index) => (
                <ImageCard key={image.title} image={image} />
              ))}
            </div>
          </div>
        </section> */}

        {/* Popular Tags */}
        {/* <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Popular Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Link key={tag} href={`/search?tag=${tag}`}>
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </section> */}

        {/* Gallery Grid with Pagination */}
        <section id="gallery" className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Latest Uploads
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-
                {Math.min(startIndex + ITEMS_PER_PAGE, animeImages.length)} of{" "}
                {animeImages.length}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paginatedImages.map((image) => (
                <ImageCard key={image.title} image={image} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
