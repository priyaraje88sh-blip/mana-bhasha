"""Generate Telugu audio with text-to-speech. Output: audio/te/<id>.mp3 + map.json.
Every clip must be listened to and approved by a fluent Telugu speaker (Rule 1)."""
import json, base64, hashlib, subprocess, sys, os, re, time, urllib.request
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "audio", "te")
URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent"

def texts_for(worlds):
    js = open(os.path.join(ROOT, "js", "content-te.js"), encoding="utf-8").read()
    node = "const fs=require('fs');eval(fs.readFileSync(process.argv[1],'utf8')+';globalThis.TE=TE;globalThis.G=gunintham');" \
           "const out=[];for(const w of TE.worlds){if(process.argv[2]&&!process.argv[2].split(',').includes(w.id))continue;for(const l of w.lessons){" \
           "if(l.type==='letters')l.items.forEach(i=>out.push(i.w?i.t+'. '+i.w:i.t));" \
           "if(l.type==='gunintham')G(l.base).forEach(r=>out.push(r.t));" \
           "if(['words','sentences','story'].includes(l.type))l.items.forEach(i=>out.push(i.t));" \
           "if(l.type==='trace')l.items.forEach(t=>out.push(t));" \
           "if(l.type==='poem')out.push(l.lines.join(' '));}}console.log(JSON.stringify([...new Set(out)]))"
    return json.loads(subprocess.check_output(["node", "-e", node, os.path.join(ROOT, "js", "content-te.js"), worlds]))

def tts(text):
    body = {"contents": [{"parts": [{"text": "Read this Telugu text aloud clearly and slowly, with correct Telugu pronunciation, like a warm, friendly teacher speaking to a young child. Say only the text: " + text}]}],
            "generationConfig": {"responseModalities": ["AUDIO"], "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": "Kore"}}}}}
    req = urllib.request.Request(URL, json.dumps(body).encode(), {"Content-Type": "application/json", "x-goog-api-key": "dummy"})
    d = json.load(urllib.request.urlopen(req, timeout=120))
    return base64.b64decode(d["candidates"][0]["content"]["parts"][0]["inlineData"]["data"])

def main():
    worlds = sys.argv[1] if len(sys.argv) > 1 else ""
    mp = json.load(open(os.path.join(OUT, "map.json"), encoding="utf-8"))
    for t in texts_for(worlds):
        if t in mp and os.path.exists(os.path.join(OUT, mp[t])): continue
        fid = hashlib.sha1(t.encode()).hexdigest()[:12] + ".mp3"
        for attempt in range(4):
            try:
                pcm = tts(t); break
            except Exception as e:
                print("retry", t, e, file=sys.stderr); time.sleep(5 * (attempt + 1))
        else:
            continue
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "s16le", "-ar", "24000", "-ac", "1", "-i", "-",
                        "-af", "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse",
                        "-b:a", "48k", os.path.join(OUT, fid)], input=pcm, check=True)
        mp[t] = fid; time.sleep(8)
        json.dump(mp, open(os.path.join(OUT, "map.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=0)
        print("ok", t)
main()
