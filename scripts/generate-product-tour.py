"""Build a captioned tour from real admin, mentor, and mentee demo captures."""
from pathlib import Path
import subprocess

root = Path(__file__).resolve().parent.parent
media = root / 'public/product'
shots = [
    ('admin-dashboard', '01 / A clear view of your whole program', 'ADMIN  /  People, clan priorities, and the progress that matters.'),
    ('mentor-dashboard', '02 / Put your attention where it helps', 'MENTOR  /  Reviews, roadblocks, and meaningful check-ins.'),
    ('mentee-dashboard', '03 / Make your next step a clear one', 'MENTEE  /  Your next task, your progress, and your people.'),
    ('mentee-learning', '04 / Turn direction into daily progress', 'LEARNING  /  Practical tasks, clear deliverables, and mentor feedback.'),
]
args = ['ffmpeg', '-y', '-loglevel', 'error']
for name, _, _ in shots:
    args += ['-loop', '1', '-framerate', '24', '-t', '8', '-i', str(media / (name + '.png'))]
filters = []
for i, (_, title, subtitle) in enumerate(shots):
    filters.append(
        f"[{i}:v]scale=1280:810:force_original_aspect_ratio=decrease,"
        "pad=1280:810:(ow-iw)/2:(oh-ih)/2:color=0x073d3b,"
        "pad=1440:960:80:120:color=0x073d3b,setsar=1,"
        f"drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:text='{title}':x=80:y=27:fontsize=28:fontcolor=white,"
        f"drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:text='{subtitle}':x=80:y=70:fontsize=17:fontcolor=0xc9e5dc,"
        f"fade=t=in:st=0:d=0.3,fade=t=out:st=7.7:d=0.3,format=yuv420p[v{i}]"
    )
filters.append(''.join(f'[v{i}]' for i in range(len(shots))) + f'concat=n={len(shots)}:v=1:a=0[out]')
args += ['-filter_complex', ';'.join(filters), '-map', '[out]', '-c:v', 'libx264', '-preset', 'fast', '-crf', '20', '-movflags', '+faststart', '-an', str(media / 'pathment-tour.mp4')]
subprocess.run(args, check=True)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', '1', '-i', str(media / 'pathment-tour.mp4'), '-frames:v', '1', str(media / 'tour-poster.webp')], check=True)
chapters = ['Admin overview: people, clan priorities, and program progress.', 'Mentor dashboard: reviews, roadblocks, and meaningful check-ins.', 'Mentee dashboard: your next task, your progress, and your people.', 'Mentee learning: practical tasks, deliverables, and mentor feedback.']
vtt = 'WEBVTT\n\n'
for i, caption in enumerate(chapters):
    vtt += f'00:{i*8:02d}.000 --> 00:{(i+1)*8:02d}.000\n{caption}\n\n'
(media / 'tour.vtt').write_text(vtt)
print('Created 32-second tour with all three roles, poster, and captions.')
