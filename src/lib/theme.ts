import type { ThemeTokens } from "@/data/stories";

const keys: Record<keyof Omit<ThemeTokens, "scheme">, string> = {
  bg: "--bg",
  surface: "--surface",
  ink: "--ink",
  muted: "--muted",
  accent: "--accent",
  accentInk: "--accent-ink",
  line: "--line",
};

export function themeVars(t: ThemeTokens): Record<string, string> {
  const vars: Record<string, string> = { "color-scheme": t.scheme };
  for (const [k, cssVar] of Object.entries(keys)) vars[cssVar] = t[k as keyof typeof keys];
  return vars;
}

export function themeCss(t: ThemeTokens, selector = ":root") {
  const body = Object.entries(themeVars(t))
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
  return `${selector}{${body}}`;
}

export function applyTheme(el: HTMLElement, t: ThemeTokens | null) {
  for (const [k, v] of Object.entries(t ? themeVars(t) : {})) el.style.setProperty(k, v);
  if (!t) {
    for (const cssVar of [...Object.values(keys), "color-scheme"]) el.style.removeProperty(cssVar);
  }
}
