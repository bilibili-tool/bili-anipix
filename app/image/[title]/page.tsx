import { notFound } from "next/navigation";

import Link from "next/link";
import { getImageByTitle, animeImages } from "@/lib/anime-data";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ImageCard } from "@/components/image-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomImage } from "@/components/image";
import {
  Heart,
  Eye,
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Download,
  Shuffle,
} from "lucide-react";

interface PageProps {
  params: Promise<{ title: string }>;
}

export async function generateStaticParams() {
  return animeImages.map((image) => ({
    title: image.title,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { title } = await params;
  const image = getImageByTitle(title);

  if (!image) {
    return {
      title: "Image Not Found | AniPix",
    };
  }

  return {
    title: `${image.title} | AniPix`,
    description: image.description,
  };
}

export default async function ImageDetailPage({ params }: PageProps) {
  const { title } = await params;
  const image = getImageByTitle(title);

  if (!image) {
    notFound();
  }

  // Get related images (same tags, excluding current)
  const relatedImages = animeImages
    .filter(
      (img) =>
        img.id !== image.id &&
        img?.tags?.some((tag) => image.tags.includes(tag)),
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-16">
        {/* Back Button */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Gallery
            </Link>
          </Button>
        </div>

        {/* Image Detail */}
        <section className="pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[750px] rounded-2xl overflow-hidden bg-card border border-border flex items-center justify-center">
                <CustomImage
                  alt={image.description || image.title}
                  title={image.description || image.title}
                  dataId={image.id}
                  dataSize={image.size}
                  dataAuthorId={image.author_id}
                  dataCategory={image.category}
                  dataDatetime={image.date_time}
                  className="object-cover"
                  src={`${image.src}${process.env.NEXT_PUBLIC_DETAIL_BILI_IMG_QUALITY}`}
                />
              </div>

              {/* Info */}
              <div className="flex flex-col">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  {/* {image.title} */}
                </h1>
                {/* Artist */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">UId</p>
                    <p className="font-medium text-foreground">
                      {image.author_id}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mt-6 py-4 border-y border-border">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-accent fill-accent" />
                    <span className="font-semibold text-foreground">{}</span>
                    <span className="text-muted-foreground">likes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{}</span>
                    <span className="text-muted-foreground">views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {new Date(image.date_time * 1000).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Description
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {image.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-foreground mb-3">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {image?.tags?.map((tag) => (
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
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-8">
                  <Button className="flex-1 sm:flex-none">
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-none bg-transparent"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" asChild>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_BILI_IMG_PROXY_URL}?url=${image.src}`}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/random">
                      <Shuffle className="h-4 w-4 mr-2" />
                      Random
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Images */}
        {relatedImages.length > 0 && (
          <section className="py-16 bg-card/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Related Artwork
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedImages.map((relatedImage) => (
                  <ImageCard key={relatedImage.title} image={relatedImage} />
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
