import sys, wave, json
from pocketsphinx import Decoder
text = open(sys.argv[2]).read().split()
wav = wave.open(sys.argv[1], 'rb'); data = wav.readframes(wav.getnframes())
d = Decoder(samprate=16000, bestpath=False)
missing = [w for w in text if d.lookup_word(w) is None]
if missing: print("MISSING", missing); sys.exit(1)
d.set_align_text(" ".join(text))
d.start_utt(); d.process_raw(data, full_utt=True); d.end_utt()
words = [dict(word=s.word, start=s.start_frame/100, end=(s.end_frame+1)/100) for s in d.seg() if s.word not in ('<s>','</s>','<sil>','(NULL)')]
json.dump(words, open(sys.argv[3],'w'), indent=0)
for w in words: print(f"{w['start']:6.2f} {w['end']:6.2f} {w['word']}")
