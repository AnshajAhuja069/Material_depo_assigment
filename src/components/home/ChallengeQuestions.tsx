import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { Reveal } from "@/components/motion/Reveal";

const questions = [
  "How can a tile communicate an emotion?",
  "How can one material transform different spaces?",
  "How can physical displays help customers make faster, more confident design choices?",
];

/** Scene 03 — the three questions behind the exploration. */
export function ChallengeQuestions() {
  return (
    <section className="gutter py-[16vh]" aria-labelledby="challenge-heading">
      <div className="grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="eyebrow text-muted">The design challenge</p>
        </Reveal>
        <div className="lg:col-span-9">
          <AnimatedHeadline
            id="challenge-heading"
            text="From Material Selection to Material Experience"
            className="display text-headline max-w-4xl"
          />
          <ol className="mt-16 border-t hairline">
            {questions.map((q, i) => (
              <li key={q} className="grid grid-cols-[3rem_1fr] gap-4 border-b hairline py-10 sm:grid-cols-[5rem_1fr] sm:py-14">
                <span className="eyebrow pt-3 tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <ScrollWords text={q} className="display text-[clamp(1.9rem,4.4vw,4rem)] leading-[1.02] text-balance" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
