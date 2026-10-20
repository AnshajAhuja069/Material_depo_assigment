import { nextStory, type Story } from "@/data/stories";
import { getHome } from "@/data/homes";
import { ThemeStyle } from "@/components/theme/ThemeStyle";
import { ChapterRail } from "@/components/story/ChapterRail";
import { MaterialHero } from "@/components/story/MaterialHero";
import { NextStory } from "@/components/story/NextStory";
import { HomeSelectionProvider } from "@/components/curation/HomeSelection";
import { HomeOverview } from "@/components/curation/HomeOverview";
import { MaterialFlatLay } from "@/components/curation/MaterialFlatLay";
import { RoomExplorer } from "@/components/curation/RoomExplorer";
import { WholeHomeReveal } from "@/components/curation/WholeHomeReveal";
import { MaterialMatrix } from "@/components/curation/MaterialMatrix";
import { CohesionRationale } from "@/components/curation/CohesionRationale";
import { MoodboardSection } from "@/components/curation/MoodboardSection";
import { MaterialSources } from "@/components/curation/MaterialSources";

const chapters = ["The Home", "The Materials", "The Rooms", "The Connections", "The Cohesion"] as const;

/**
 * One whole-home sequence per story:
 * the theme → the home → its materials → room by room → how they connect →
 * why they work → the composition → sources → the next home.
 */
export function MaterialStoryLayout({ story }: { story: Story }) {
  const home = getHome(story.slug);
  return (
    <article className="mx-auto max-w-[1600px]" data-story={story.slug}>
      <ThemeStyle theme={story.theme} />
      <ChapterRail chapters={chapters} />
      <HomeSelectionProvider home={home}>
        <MaterialHero story={story} />
        <HomeOverview story={story} />
        <MaterialFlatLay story={story} />
        <RoomExplorer story={story} />
        <WholeHomeReveal story={story} />
        <MaterialMatrix story={story} />
        <CohesionRationale story={story} />
        <MoodboardSection story={story} />
      </HomeSelectionProvider>
      <MaterialSources story={story} />
      <NextStory next={nextStory(story)} />
    </article>
  );
}
