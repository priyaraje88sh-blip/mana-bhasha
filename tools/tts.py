"""Make Telugu audio for the course, offline and free.
Voice: Piper "te_IN-padmavathi-medium" (trained on AI4Bharat IndicVoices-R, CC-BY-4.0 — credit shown in the app).
Usage: python3 tools/tts.py /path/to/te_IN-padmavathi-medium.onnx
Every clip must be listened to and approved by a fluent Telugu speaker before launch (Rule 1)."""
import json, hashlib, subprocess, sys, os, wave, tempfile
from piper import PiperVoice
from piper.config import SynthesisConfig
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "audio", "te")

def texts():
    node = ("const fs=require('fs');eval(fs.readFileSync(process.argv[1],'utf8')+';globalThis.TE=TE;globalThis.G=gunintham');"
            "const out=[];for(const w of TE.worlds)for(const l of w.lessons){"
            "if(l.type==='letters')l.items.forEach(i=>out.push(i.w?i.t+'. '+i.w:i.t));"
            "if(l.type==='gunintham')G(l.base).forEach(r=>out.push(r.t));"
            "if(['words','sentences','story'].includes(l.type))l.items.forEach(i=>out.push(i.t));"
            "if(l.type==='trace')l.items.forEach(t=>out.push(t));"
            "if(l.type==='poem')out.push(l.lines.join('. '));}console.log(JSON.stringify([...new Set(out)]))")
    return json.loads(subprocess.check_output(["node", "-e", node, os.path.join(ROOT, "js", "content-te.js")]))

def main():
    voice = PiperVoice.load(sys.argv[1])
    cfg = SynthesisConfig(length_scale=1.25, noise_scale=0.5, noise_w_scale=0.6)  # slower and clearer for learners
    for f in os.listdir(OUT):
        if f.endswith(".mp3"): os.remove(os.path.join(OUT, f))
    mp = {}
    for t in texts():
        fid = hashlib.sha1(t.encode()).hexdigest()[:12] + ".mp3"
        with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
            with wave.open(tmp.name, "wb") as w:
                voice.synthesize_wav(t, w, syn_config=cfg)
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp.name, "-ac", "1", "-b:a", "48k",
                            "-af", "apad=pad_dur=0.15", os.path.join(OUT, fid)], check=True)
        mp[t] = fid
    json.dump(mp, open(os.path.join(OUT, "map.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    print(len(mp), "clips")
main()
