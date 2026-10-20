import { ThemeStyle } from "@/components/theme/ThemeStyle";
import { HomeHero } from "@/components/home/HomeHero";
import { AssignmentScene } from "@/components/home/AssignmentScene";
import { ChallengeQuestions } from "@/components/home/ChallengeQuestions";
import { ApproachSteps } from "@/components/home/ApproachSteps";
import { CollectionShowcase } from "@/components/home/CollectionShowcase";
import { DesignSystemBoards } from "@/components/home/DesignSystemBoards";
import { DisplayConcept } from "@/components/home/DisplayConcept";
import { homeTheme } from "@/data/site";

/**
 * The exhibition, in the order an interviewer should meet it:
 * the challenge → the design thinking → the five worlds → the original
 * compositions → the physical merchandising idea.
 */
export default function Home() {
  return (
    <>
      <ThemeStyle theme={homeTheme} />
      <HomeHero />
      <AssignmentScene />
      <ChallengeQuestions />
      <ApproachSteps />
      <CollectionShowcase />
      <DesignSystemBoards />
      <DisplayConcept />
    </>
  );
}
