import os
import subprocess
from pathlib import Path

# 配置参数
INPUT_DIR = Path("displayStudio")
OUTPUT_DIR = Path("displayStudio/compressed")
MAX_WIDTH = 1920
QUALITY = 80
SUPPORTED_EXTS = [".jpg", ".jpeg", ".png"]

def compress_image(input_path: Path, output_path: Path):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "ffmpeg",
        "-i", str(input_path),
        "-vf", f"scale='min({MAX_WIDTH},iw)':-1",
        "-q:v", str(QUALITY),
        str(output_path)
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"✅ Compressed: {output_path}")
    except subprocess.CalledProcessError:
        print(f"❌ Failed: {input_path}")

def walk_and_compress(input_dir: Path):
    for root, _, files in os.walk(input_dir):
        for file in files:
            ext = Path(file).suffix.lower()
            if ext in SUPPORTED_EXTS:
                input_path = Path(root) / file
                relative_path = input_path.relative_to(INPUT_DIR)
                output_file = relative_path.with_suffix(".webp")
                output_path = OUTPUT_DIR / output_file
                compress_image(input_path, output_path)

if __name__ == "__main__":
    walk_and_compress(INPUT_DIR)
