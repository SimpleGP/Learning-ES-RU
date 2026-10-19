"""Regenerate Spanish and Russian MP3 assets when course phrases change.

Install edge-tts==7.3.1 in an optional local environment before running.
Input .audio-input.json is exported from the course data by the authoring step.
"""
import asyncio
import hashlib
import json
import os
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent.parent
VOICE = "es-MX-DaliaNeural"
RATE = "-8%"


async def main():
    phrases = json.loads((ROOT / ".audio-input.json").read_text(encoding="utf-8"))
    output = ROOT / "public" / "audio"
    output.mkdir(parents=True, exist_ok=True)
    semaphore = asyncio.Semaphore(4)
    completed = 0
    manifest = {}

    async def create(text):
        nonlocal completed
        voice = "ru-RU-SvetlanaNeural" if any("\u0400" <= c <= "\u04ff" for c in text) else VOICE
        name = hashlib.sha256((voice + RATE + text).encode()).hexdigest()[:20] + ".mp3"
        target = output / name
        async with semaphore:
            if not target.exists() or target.stat().st_size < 512:
                spoken = text.replace(" / ", ". ").replace("…", ".").replace("\u0301", "")
                for attempt in range(3):
                    try:
                        await edge_tts.Communicate(spoken, voice, rate=RATE).save(str(target) + ".part")
                        if Path(str(target) + ".part").stat().st_size < 512:
                            raise RuntimeError("Empty audio: " + text)
                        os.replace(str(target) + ".part", target)
                        break
                    except Exception:
                        if attempt == 2:
                            raise
                        await asyncio.sleep(1 + attempt)
            manifest[text] = "audio/" + name
            completed += 1
            if completed % 25 == 0 or completed == len(phrases):
                print(f"Audio: {completed}/{len(phrases)}", flush=True)

    await asyncio.gather(*(create(text) for text in phrases))
    content = "/* Static audio: Dalia es-MX and Svetlana ru-RU, rate -8%. */\n"
    content += "const RECORDED_VOICE = {es:'Dalia',ru:'Svetlana'};\n"
    content += "const LESSON_AUDIO = Object.freeze(" + json.dumps(dict(sorted(manifest.items())), ensure_ascii=False, indent=2) + ");\n"
    (ROOT / "public" / "audio-manifest.js").write_text(content, encoding="utf-8")
    print(f"Ready: {len(manifest)} phrases, {sum(f.stat().st_size for f in output.glob('*.mp3'))} bytes", flush=True)


if __name__ == "__main__":
    asyncio.run(main())
