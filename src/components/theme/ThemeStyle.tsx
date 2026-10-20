import type { ThemeTokens } from "@/data/stories";
import { themeCss } from "@/lib/theme";

/**
 * Server-rendered theme tokens for a route. Because the tokens are plain CSS
 * custom properties on :root, swapping routes changes their computed values
 * and the body's colour transition animates the atmosphere change.
 */
export function ThemeStyle({ theme }: { theme: ThemeTokens }) {
  return <style dangerouslySetInnerHTML={{ __html: themeCss(theme) }} />;
}
