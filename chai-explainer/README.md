# Chai Stall Explainer

A 2D animated finance explainer about a chai stall, built with Remotion (React + TypeScript).
Every visual is an original SVG component in `src/assets/`.

Final video: `out/chai-stall-explainer.mp4` (1920 x 1080, 30 fps, H.264 + AAC, 36.1 s)

## Change the script, numbers or colours

Everything editable lives in two files. Scene code reads from them, so you never need to touch the scenes.

| What | Where |
|---|---|
| On-screen numbers (cups, prices, costs, profit, setup items) | `numbers` in `src/config.ts` |
| Narration text (for reference and the README) | `script` in `src/config.ts` |
| Scene start/end and the word each object pops in on | between `// <timings>` markers in `src/config.ts` (generated, see below) |
| Background music | `audio.music` in `src/config.ts` (put the file in `public/music/`) |
| Colours, outline width, font | `src/theme.ts` |

If you change a number, also say it in the voiceover, otherwise picture and sound will disagree.

## Replace or regenerate the voiceover

1. Put the new recording at `public/audio/voiceover.mp3`.
2. If the wording changed, update `scripts/script_words.txt` (lowercase, numbers spelled out, one sentence per line).
3. Re-time everything from the audio:

```
pip install pocketsphinx
ffmpeg -y -i public/audio/voiceover.mp3 -ar 16000 -ac 1 work/vo16k.wav
python3 scripts/align.py work/vo16k.wav scripts/script_words.txt work/words.json
python3 scripts/sync_timings.py work/words.json
```

`align.py` force-aligns the audio to the script and writes word timings. `sync_timings.py`
writes scene cuts (placed in the pause between sentences) and word cues into `src/config.ts`.

To generate a synthetic voice instead of recording one (needs access to speech.platform.bing.com):

```
pip install edge-tts
edge-tts --voice en-IN-PrabhatNeural --rate=-5% --text "$(cat <your script file>)" \
  --write-media public/audio/voiceover.mp3 --write-subtitles public/audio/voiceover.vtt
```

Then run the alignment steps above.

## Preview and render

```
npm install
npx remotion studio                 # live preview in the browser
npx remotion render ChaiExplainer out/chai-stall-explainer.mp4 --codec=h264 --audio-codec=aac
```

`remotion.config.ts` points Remotion at the Chromium installed in the build container.
On your own machine, delete the `setBrowserExecutable` line and Remotion will use its own browser.

QA stills (one from the middle of each scene):

```
for t in 2.6 5.85 10.5 16.85 23.4 29.9 34.6; do ffmpeg -v error -y -ss $t -i out/chai-stall-explainer.mp4 -frames:v 1 out/qa/scene_$t.png; done
```

## Project layout

```
src/config.ts       script, numbers, scene timings and word cues
src/theme.ts        colours, outline, font
src/components/     PopIn, CountUp, SlideIn, SlowZoom, IdleBob, Steam, CoinsFly, CostDrain
src/assets/         ChaiSeller, Cart, Kitchen items, Money, Calendar, Backdrop, ...
src/scenes/         Scene1Hook ... Scene7Outro (+ StallLayout shared by scenes 1, 2, 7)
src/Video.tsx       sequences the scenes with the audio
public/audio/       voiceover.mp3
public/fonts/       Poppins (Google Fonts, OFL), bundled so renders work offline
scripts/            alignment and timing tools
storyboard/         approved storyboard frames
```
