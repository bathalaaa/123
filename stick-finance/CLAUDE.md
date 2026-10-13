# Stick-Figure Finance Explainer: Production Guide

Claude Code reads this file automatically at the start of every session in this folder, so every video follows the same style without re-explaining it.

## 0. Ground rules (always follow)

- **Original identity.** Match the genre (minimal stick-figure finance explainers like the "economics of owning a business" format), never a specific channel. Do not recreate any existing channel's character design, mascot, logo, intro, outro, channel name, or signature catchphrases.
- **Build everything in code.** All characters, props and backgrounds are SVG / React components inside this project. No downloaded artwork.
- **Revisions are surgical.** When I ask for a change, change ONLY what I mention. Do not rebuild scenes, restyle, rename, or refactor anything I did not ask about.
- **No em dashes** in on-screen text or scripts.
- **Config driven.** Script, numbers, colors and timings live in config files, never hard-coded inside scene components.
- **Reuse first.** Before creating a new character pose, prop or component, check `src/library/` and reuse or extend what exists.

## 1. The format

- **Topic pattern:** "The Economics of [Business / Thing]" (owning a cafe, a chai stall, a gym, a petrol pump, a YouTube channel, a wedding, etc.).
- **Story arc:** relatable hook, then setup costs, then how money comes in, then every cost line by line, then real profit, then a twist or hidden cost, then a short verdict.
- **Length:** 30 s tests, 1 to 3 min shorts, 8 to 15 min full videos.
- **Tone:** calm, curious, conversational, light dry humor. Talks to the viewer as "you". Explains every number simply.
- **Visual rule:** one idea per scene, and a new visual change every 2 to 4 seconds, synced to the narration.

## 2. Canvas and look

- **Background:** plain white or very light off-white (`#FFFFFF` or `#FAFAF7`). Lots of empty space. No busy backgrounds.
- **Lines:** dark charcoal (`#1E1E1E`), round line caps and joins, consistent stroke width (6 px at 1080p for characters, 4 px for props).
- **Hand-drawn feel:** use roughjs (low roughness, around 0.6 to 1.0) or a slight path wobble so lines feel sketched, not perfectly geometric. Keep it subtle and consistent across the whole video.
- **Color:** the scene is mostly black lines on white. Color is used ONLY to direct attention:
  - Money / profit / income: green `#2EAD5B`
  - Costs / losses / warnings: red `#E04848`
  - Highlights / key object: one warm accent (e.g. yellow `#F5B82E`)
  - Props may have flat pastel fills, max 2 colors per prop
- **Resolution:** 1920 x 1080, 30 fps (or 1080 x 1920 for Shorts, same style).

## 3. The stick-figure character system

### 3.1 Design

- **Head:** circle, diameter = 1/5 of total figure height.
- **Body:** single straight line (torso), about 1.3 x head diameter.
- **Arms and legs:** single lines with a bend at elbow and knee. Hands and feet are simple rounded ends (no fingers, except an optional pointing finger stroke).
- **Face:** two dot eyes, simple line mouth. Optional eyebrows for emotion. No nose.
- **Main narrator character:** give them ONE original signature detail that makes them recognizable across videos (e.g. round glasses, a small tie, a cap, a bag). Pick it once, store it in `src/library/characters/Narrator.tsx`, and never change it between videos.
- **Other characters:** same stick style, distinguished by one simple accessory (apron for shop owner, helmet for worker, briefcase for investor, hair bun, etc.).

### 3.2 Rig (so animation is cheap)

Build the figure as a rig, not as separate drawings:

- Joints: neck, left/right shoulder, elbow, hand, hip, knee, foot.
- A pose is just a set of joint angles (JSON). Store poses in `src/library/poses.ts`.
- Switching poses = interpolating angles over 4 to 6 frames with easing. This gives smooth, limited animation at very low cost.

### 3.3 Pose library (build once, reuse forever)

stand, idle (gentle breathing bob), wave, point-left, point-right, point-up, think (hand on chin), shrug, facepalm, celebrate (arms up), shocked (arms out, mouth open), hold-object (both hands forward), count-money, walk (8-frame cycle), sit, sit-desk-typing, sad (slumped), explain (one palm open).

### 3.4 Expressions

neutral, happy, big-smile, worried, shocked, thinking, annoyed, smug. Eyes blink every 3 to 5 seconds automatically.

## 4. Props and infographics

- **Props:** simple outlined objects with optional flat fill: shop counter, cart, building, machines, cups, products, cash notes (₹), coins, wallet, piggy bank, bank, calculator, receipt, calendar, clock, laptop, phone, truck, house, rent sign.
- Store every prop as its own component in `src/library/props/` so the next video can reuse it.
- **Infographics (core of the format):**
  - Big hero numbers (e.g. ₹4,500) with CountUp
  - Price tags hanging off objects
  - Running total bar: green income bar that red costs eat into
  - Simple bar chart, pie chart, and "receipt" list that prints line by line
  - Equations on screen: ₹15 × 300 = ₹4,500
  - Calendar flip for "per month", clock spin for "per hour"
- **Numbers:** always Indian formatting when using ₹ (₹1,25,000), with ₹ symbol. Show units ("/day", "/month").
- **Text:** short labels only, max about 6 words on screen at once. Font: a clean handwritten-style or rounded font via `@remotion/google-fonts` (e.g. "Patrick Hand", "Kalam", or "Nunito" bold for numbers). Pick one pair and keep it for all videos.

## 5. Motion vocabulary

Use only these, all as reusable components in `src/library/motion/`:

| Component | Use |
|---|---|
| DrawOn | Lines draw themselves in (stroke-dashoffset), whiteboard feel. Use for props and charts, 10 to 20 frames. |
| PopIn | Spring scale 0 to 1.08 to 1 for icons, labels, numbers. |
| PoseTo | Character switches pose over 4 to 6 frames. |
| CountUp | Numbers counting up with ₹ formatting. |
| SlideIn | Objects enter from a side. |
| CameraPan | Scenes laid out on one wide canvas; camera pans / zooms between areas instead of hard cuts. |
| SlowZoom | 1.00 to 1.04 drift so no frame is ever fully static. |
| CoinsFly / CashRain | Income moments. |
| CostDrain | Red cost blocks stack and subtract from the green total. |
| Shake | Small shake on shock / bad news. |
| ThoughtBubble / SpeechBubble | Character thinking or saying a short line. |

**Animation principles:**

- Limited animation: characters mostly HOLD poses and switch on key words. That is the style, and it keeps cost low.
- Every visual change lands on the word it represents (use word timings from the voiceover).
- Transitions: camera pans or clean cuts. No flashy wipes or 3D effects.

## 6. Script writing formula

Write scripts in `scripts/<video-name>.md`. Target about 150 words per minute.

1. **Hook** (first 5 to 10 s): a surprising fact or question. "This chai stall makes more per month than many office jobs. But how?"
2. **Setup:** what it takes to start, with real looking numbers.
3. **Revenue:** how money comes in, shown as a simple equation.
4. **Costs:** list each cost one at a time, each with its own visual.
5. **Profit:** the real take-home, per day and per month.
6. **Twist:** a hidden cost, risk, or surprising insight.
7. **Verdict:** one or two sentences, light humor, no hard sell.

Rules: short sentences, one number per sentence where possible, no jargon without a quick explanation. Mark all figures as estimates in the description. Keep numbers in `src/config/<video-name>.ts`.

## 7. Voice and audio

- **Voiceover:** calm, clear, medium pace.
  - Free default: edge-tts, voice `en-IN-PrabhatNeural` (English) or `hi-IN-MadhurNeural` (Hindi), rate `-5%`, generated with `--write-subtitles` for timing.
  - Optional upgrade: ElevenLabs if `ELEVENLABS_API_KEY` is in `.env`.
- **Timing:** always read the subtitle / word-timing file and set scene frames from it. Never guess timings.
- **Music:** soft, light background track, only if I place a royalty-free file in `public/music/`. Mix around -20 dB under the voice. Never download music yourself.
- **SFX (optional, low):** pop on PopIn, pencil scratch on DrawOn, coin clink on income, soft "whoosh" on camera pans. Only royalty-free files I provide.

## 8. Project structure

```
CLAUDE.md                  # this guide
scripts/                   # one .md script per video
src/
  config/                  # per-video numbers, script, timings
  theme.ts                 # colors, fonts, stroke widths (shared by all videos)
  library/
    characters/            # Narrator.tsx, ShopOwner.tsx, Customer.tsx ...
    poses.ts               # pose library (joint angles)
    expressions.ts
    props/                 # reusable props
    infographics/          # CountUp, BarChart, Receipt, TotalBar ...
    motion/                # DrawOn, PopIn, PoseTo, CameraPan ...
  videos/
    <video-name>/          # scenes for one video + composition
public/
  audio/<video-name>/      # voiceover.mp3 + timing file
  music/                   # my royalty-free tracks
out/                       # renders and QA stills
```

Tech: Remotion (React + TypeScript), roughjs for the sketch look, edge-tts, ffmpeg.

## 9. Workflow for each new video

1. I give a topic (and optionally the script and numbers).
2. Write or tidy the script in `scripts/`, show it to me, wait for approval.
3. Generate the voiceover and timing file.
4. Write a scene plan table: scene, narration line, visuals, pose, start/end time. Show it to me.
5. Build only the new props or poses this video needs; reuse everything else from `src/library/`.
6. Build scenes in `src/videos/<video-name>/`.
7. Render a low-res draft first (`--scale=0.5`), extract QA stills, fix issues.
8. Render the final.

## 10. QA checklist (before calling any render done)

- Extract one still per scene with ffmpeg into `out/<video-name>/qa/` and look at every one.
- No overlapping, clipped or off-screen text or objects.
- Narrator looks identical in every scene (same signature detail, proportions, stroke).
- Numbers on screen match the narration exactly, and the math adds up.
- Every visual change lines up with its spoken word.
- Text readable on a phone screen.
- No frame stays completely still for more than 3 seconds.
- Audio and visuals in sync to the last frame (check with ffprobe).

## 11. Token-saving habits

- Start each new video with `/clear`; this file reloads automatically.
- Reuse library components instead of redrawing.
- Render low-res drafts; render full quality once at the end.
- Ask Claude Code for specific fixes ("move the ₹4,500 label up 40 px"), not open-ended "make it better".
