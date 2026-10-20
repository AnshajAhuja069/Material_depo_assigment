import { nextStory, type Story } from "@/data/stories";
import { ThemeStyle } from "@/components/theme/ThemeStyle";
import { ChapterRail } from "@/components/story/ChapterRail";
import { MaterialHero } from "@/components/story/MaterialHero";
import { StoryIntro } from "@/components/story/StoryIntro";
import { ApplicationGallery } from "@/components/story/ApplicationGallery";
import { SignatureInterlude } from "@/components/story/SignatureInterlude";
import { MaterialLanguage } from "@/components/story/MaterialLanguage";
import { MaterialDetail } from "@/components/story/MaterialDetail";
import { BoardPreview } from "@/components/story/BoardPreview";
import { SourceReferences } from "@/components/story/SourceReferences";
import { NextStory } from "@/components/story/NextStory";

/**
 * One editorial sequence for every story: experience the material first,
 * then meet the real product, then the original composition.
 */
export function MaterialStoryLayout({ story }: { story: Story }) {
  return (
    <article className="mx-auto max-w-[1600px]" data-story={story.slug}>
      <ThemeStyle theme={story.theme} />
      <ChapterRail chapters={story.chapters} />
      <MaterialHero story={story} />
      <StoryIntro story={story} />
      <ApplicationGallery story={story} />
      <SignatureInterlude story={story} />
      <MaterialLanguage story={story} />
      <MaterialDetail story={story} />
      <BoardPreview story={story} />
      <SourceReferences story={story} />
      <NextStory next={nextStory(story)} />
    </article>
  );
}
