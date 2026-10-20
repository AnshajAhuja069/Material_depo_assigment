import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStory, stories } from "@/data/stories";
import { MaterialStoryLayout } from "@/components/story/MaterialStoryLayout";

export const dynamicParams = false;

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const story = getStory((await params).slug);
  if (!story) return {};
  return {
    title: `${story.number} ${story.title}`,
    description: `${story.subtitle} ${story.narrative}`,
    openGraph: { images: [story.images.hero.src] },
  };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const story = getStory((await params).slug);
  if (!story) notFound();
  return <MaterialStoryLayout story={story} />;
}
