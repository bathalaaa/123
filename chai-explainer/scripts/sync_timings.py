"""Write scene and cue timings into src/config.ts from aligned word timings.

Usage: python3 scripts/sync_timings.py [work/words.json]
Scene cuts land in the middle of the pause between sentences.
Cues are tied to spoken words, so objects pop in on the word.
"""
import json, re, sys

words = json.load(open(sys.argv[1] if len(sys.argv) > 1 else "work/words.json"))
for w in words:
    w["word"] = re.sub(r"\(\d+\)$", "", w["word"])

def find(word, n=1, after=0.0):
    """Start time of the n-th occurrence of `word` at or after `after` seconds."""
    hits = [w for w in words if w["word"] == word and w["start"] >= after]
    return round(hits[n - 1]["start"], 2)

def end_of(word, n=1, after=0.0):
    hits = [w for w in words if w["word"] == word and w["start"] >= after]
    return hits[n - 1]["end"]

def gap_mid(last_word, next_word, after=0.0):
    a = end_of(last_word, after=after)
    b = find(next_word, after=a)
    return round((a + b) / 2, 2)

OUTRO_HOLD = 1.0
b1 = gap_mid("day", "but")
b2 = gap_mid("home", "setting")
b3 = gap_mid("utensils", "each")
b4 = gap_mid("rupees", "milk", after=19.0)
b5 = gap_mid("rupees", "that", after=25.5)
b6 = gap_mid("month", "not")
end = round(words[-1]["end"] + OUTRO_HOLD, 2)

scenes = [("hook", 0.0, b1), ("question", b1, b2), ("setup", b2, b3), ("revenue", b3, b4),
          ("costs", b4, b5), ("profit", b5, b6), ("outro", b6, end)]
cues = {
    "hook": {"counter": find("three")},
    "question": {"questionMark": find("how"), "wallet": find("take")},
    "setup": {"total": find("fifty"), "cart": find("cart"), "stove": find("stove"), "utensils": find("utensils")},
    "revenue": {"cup": find("each"), "times": find("so", after=b3), "equals": find("four", after=b3)},
    "costs": {"milk": find("milk"), "tea": find("tea"), "sugar": find("sugar"), "gas": find("gas"),
              "cups": find("cups", after=b4), "drain": find("two", after=b4)},
    "profit": {"perDay": find("one", after=b5), "calendar": find("or", after=b5), "perMonth": find("fifty", after=b5)},
    "outro": {"wave": find("bad")},
}

lines = ["export const scenes = ["]
lines += [f'  {{ id: "{i}", start: {s}, end: {e} }},' for i, s, e in scenes]
lines += ["] as const;", "", "// Word cues in seconds (absolute). Objects pop in on the matching spoken word.", "export const cues = {"]
for k, v in cues.items():
    lines.append(f"  {k}: {{ " + ", ".join(f"{a}: {b}" for a, b in v.items()) + " },")
lines.append("};")
block = "\n".join(lines)

p = "src/config.ts"
src = open(p).read()
src = re.sub(r"// <timings>.*// </timings>", "// <timings>\n" + block + "\n// </timings>", src, flags=re.S)
src = re.sub(r'TIMINGS_SOURCE: "estimate" \| "voiceover" = "\w+"', 'TIMINGS_SOURCE: "estimate" | "voiceover" = "voiceover"', src)
open(p, "w").write(src)
print(block)
print(f"\nTotal: {end} s")
