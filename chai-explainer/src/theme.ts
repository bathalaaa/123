import { continueRender, delayRender, staticFile } from "remotion";
import fontFiles from "./fonts.json";

// Poppins (Google Fonts, OFL) is bundled in public/fonts so renders never
// depend on network access. The devanagari subset carries the ₹ glyph.
const fontFamily = "Poppins";
const fontHandle = delayRender("Loading Poppins");
Promise.all(
  fontFiles.map((f) => {
    const face = new FontFace(fontFamily, `url(${staticFile(`fonts/${f.file}`)}) format("woff2")`, {
      weight: f.weight,
      unicodeRange: f.range,
      display: "block",
    });
    document.fonts.add(face);
    return face.load();
  }),
).then(() => continueRender(fontHandle));

// Core palette (6 colours). Everything on screen is built from these,
// plus one skin tone for characters and opacity tints of the core colours.
export const colors = {
  cream: "#FFF8EC", // background
  charcoal: "#2B2A29", // text and outlines, never pure black
  chai: "#E2853A", // primary warm accent (chai orange)
  brown: "#8A5A3B", // secondary warm (wood, tea, kurta details)
  green: "#2F9E5E", // money / profit
  red: "#C9534A", // costs / expenses
  skin: "#E9B48C", // character skin tone
  white: "#FFFFFF",
} as const;

export const fonts = {
  heading: fontFamily,
  number: fontFamily,
};

// One outline style everywhere: 5px charcoal, round joins.
export const stroke = {
  width: 5,
  color: colors.charcoal,
};

export const outline = {
  stroke: stroke.color,
  strokeWidth: stroke.width,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};
