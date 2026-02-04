"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchImages, getAllTags, animeImages } from "@/lib/anime-data";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ImageCard } from "@/components/image-card";
import { Pagination } from "@/components/pagination";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X, SlidersHorizontal } from "lucide-react";

const ITEMS_PER_PAGE = 12;

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const initialTag = searchParams.get("tag") || "";
  const initialPage = Number(searchParams.get("page")) || 1;
  
  const [query, setQuery] = useState(initialQuery);
  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  const allTags = getAllTags();
  
  // Get search results
  const getResults = () => {
    let results = animeImages;
    
    if (query.trim()) {
      results = searchImages(query);
    }
    
    if (selectedTag) {
      results = results.filter((img) =>
        img.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
      );
    }
    
    return results;
  };
  
  const allResults = getResults();
  
  // Pagination
  const totalPages = Math.ceil(allResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = allResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Build return URL with current search state
  const buildReturnUrl = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedTag) params.set("tag", selectedTag);
    if (currentPage > 1) params.set("page", currentPage.toString());
    return params.toString() ? `/search?${params.toString()}` : "/search";
  };
  
  const returnUrl = buildReturnUrl();

  // Update URL when search changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedTag) params.set("tag", selectedTag);
    if (currentPage > 1) params.set("page", currentPage.toString());
    
    const newUrl = params.toString() ? `/search?${params.toString()}` : "/search";
    router.replace(newUrl, { scroll: false });
  }, [query, selectedTag, currentPage, router]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedTag]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? "" : tag);
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedTag("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-16">
        {/* Search Header */}
        <section className="py-12 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Search Artwork
              </h1>
              <p className="mt-2 text-muted-foreground">
                Find amazing anime-inspired art by title, artist, or tags
              </p>
            </div>

            {/* Search Input */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by title, artist, or description..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-background border-border rounded-xl"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-muted-foreground"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>

                {(query || selectedTag) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            {/* Tag Filters */}
            {showFilters && (
              <div className="max-w-4xl mx-auto mt-6">
                <p className="text-sm font-medium text-foreground mb-3">
                  Filter by Tag
                </p>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTag === tag ? "default" : "secondary"}
                      className={`px-3 py-1.5 cursor-pointer transition-colors ${
                        selectedTag === tag
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary/20 hover:text-primary"
                      }`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Active Filters */}
            {selectedTag && (
              <div className="max-w-4xl mx-auto mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Active filter:</span>
                  <Badge
                    variant="default"
                    className="px-3 py-1 bg-primary text-primary-foreground"
                  >
                    {selectedTag}
                    <button
                      onClick={() => setSelectedTag("")}
                      className="ml-2 hover:opacity-75"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-foreground">
                {allResults.length} {allResults.length === 1 ? "Result" : "Results"}
              </h2>
              {allResults.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, allResults.length)} of {allResults.length}
                </p>
              )}
            </div>

            {paginatedResults.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {paginatedResults.map((image) => (
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
              </>
            ) : (
              <div className="text-center py-16">
                <div className="h-24 w-24 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No results found
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try adjusting your search terms or filters to find what you are looking for.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 bg-transparent"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-foreground">Loading...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
