// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL = "https://ranx-vote.kylelmoy.com";

// Import and set font for each variant
import { Geist_Mono } from "next/font/google";
import { Nunito } from "next/font/google";

const heading = Nunito({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Nunito({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// default customization applied to the HTML in the main layout.tsx
const style = {
  theme: "dark",
  brand: "violet",
  accent: "magenta",
  neutral: "gray",
  border: "playful",
  solid: "contrast",
  solidStyle: "flat",
  surface: "filled",
  transition: "all",
  scaling: "100", // 90 | 95 | 100 | 105 | 110
}
const dataStyle = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false
  },
};

const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: true,
    size: "2",
    color: "brand-on-background-weak",
    opacity: 40,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
    thickness: 1,
    angle: 45,
    size: "8",
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
    width: "2",
    height: "2",
  },
};

// metadata for pages
const meta = {
  home: {
    path: "/",
    title: "ranx-vote by kyle moy",
    description:
      "A simple ranked-choice voting platform.",
    image: "/images/og/home.jpg",
    canonical: "https://ranx-vote.kylelmoy.com",
    robots: "index,follow",
    alternates: [{ href: "https://ranx-vote.kylelmoy.com", hrefLang: "en" }],
  },
  vote: {
    path: "/",
    title: "ranx-vote by kyle moy",
    description:
      "A simple ranked-choice voting platform.",
    image: "/images/og/home.jpg",
    canonical: "https://ranx-vote.kylelmoy.com",
    robots: "index,follow",
    alternates: [{ href: "https://ranx-vote.kylelmoy.com", hrefLang: "en" }],
  },
  // add more routes and reference them in page.tsx
};

// default schema data
const schema = {
  logo: "",
  type: "Person",
  name: "Kyle Moy",
  description: meta.home.description,
  email: "kyle.l.moy@gmail.com",
};

export { baseURL, fonts, style, meta, schema, social, effects, dataStyle };
