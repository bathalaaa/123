// Single source of truth for script, numbers and timings.
// Edit this file to change what is said, what is shown and when.

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Illustrative numbers for the test video.
export const numbers = {
  cupsPerDay: 300,
  setupCost: 50000,
  setupItems: [
    { label: "Cart", price: 35000 },
    { label: "Stove", price: 10000 },
    { label: "Utensils", price: 5000 },
  ],
  pricePerCup: 15,
  dailySales: 4500,
  dailyCosts: 2700,
  dailyProfit: 1800,
  monthlyProfit: 50000,
};

// Narration, one entry per scene, used for the voiceover and the README.
export const script = [
  "This tiny chai stall sells over 300 cups a day.",
  "But how much does the owner actually take home?",
  "Setting up costs around ₹50,000: a cart, a stove, and some utensils.",
  "Each cup sells for ₹15, so daily sales reach ₹4,500.",
  "Milk, tea leaves, sugar, gas and cups eat up about ₹2,700.",
  "That leaves roughly ₹1,800 a day, or over ₹50,000 a month.",
  "Not bad for a cart on the corner.",
];

// Scene timings in seconds, measured from the voiceover.
// TIMINGS_SOURCE tells you whether these come from the real audio
// ("voiceover") or are placeholders ("estimate") used only for the storyboard.
export const TIMINGS_SOURCE: "estimate" | "voiceover" = "voiceover";

// <timings>
export const scenes = [
  { id: "hook", start: 0.0, end: 4.25 },
  { id: "question", start: 4.25, end: 7.45 },
  { id: "setup", start: 7.45, end: 13.56 },
  { id: "revenue", start: 13.56, end: 20.15 },
  { id: "costs", start: 20.15, end: 26.69 },
  { id: "profit", start: 26.69, end: 33.14 },
  { id: "outro", start: 33.14, end: 36.12 },
] as const;

// Word cues in seconds (absolute). Objects pop in on the matching spoken word.
export const cues = {
  hook: { counter: 2.1 },
  question: { questionMark: 4.8, wallet: 6.46 },
  setup: { total: 8.96, cart: 10.87, stove: 11.55, utensils: 12.52 },
  revenue: { cup: 13.89, times: 16.32, equals: 17.78 },
  costs: { milk: 20.43, tea: 21.08, sugar: 21.86, gas: 22.57, cups: 23.17, drain: 24.4 },
  profit: { perDay: 27.78, calendar: 30.3, perMonth: 30.96 },
  outro: { wave: 33.55 },
};
// </timings>

export const audio = {
  voiceover: "audio/voiceover.mp3" as string | null,
  music: null as string | null, // e.g. "music/track.mp3" placed in public/
  musicVolume: 0.1, // about -20 dB under the voice
};

export const totalSeconds = scenes[scenes.length - 1].end;
export const sec = (s: number) => Math.round(s * FPS);

type SceneId = (typeof scenes)[number]["id"];
export const sceneOf = (id: SceneId) => scenes.find((s) => s.id === id)!;
// Converts an absolute cue time (s) into a frame local to that scene.
export const local = (id: SceneId, absSeconds: number) => sec(absSeconds - sceneOf(id).start);
