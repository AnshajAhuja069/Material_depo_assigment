import Link from "next/link";
import { ThemeStyle } from "@/components/theme/ThemeStyle";
import { homeTheme } from "@/data/site";

export default function NotFound() {
  return (
    <section className="gutter flex min-h-[80svh] flex-col justify-center pt-[var(--header-h)]">
      <ThemeStyle theme={homeTheme} />
      <p className="eyebrow text-muted">404</p>
      <h1 className="display text-title mt-4">This surface hasn&apos;t been laid yet.</h1>
      <Link href="/" className="eyebrow link-line mt-8 self-start py-2">
        Return to the exhibition
      </Link>
    </section>
  );
}
