const fs = require('fs');
const path = require('path');

const imagesToDownload = [
  { name: 'SPECTRUM-.png', url: 'https://www.greenwave.org.in/wp-content/uploads/2024/04/SPECTRUM-.png' },
  { name: 'SPECTRUM-861x1024.png', url: 'https://www.greenwave.org.in/wp-content/uploads/2024/04/SPECTRUM--861x1024.png' },
  { name: 'SPECTRUM-600x713.png', url: 'https://www.greenwave.org.in/wp-content/uploads/2024/04/SPECTRUM--600x713.png' },
  { name: 'SPECTRA-PRO.png', url: 'https://www.greenwave.org.in/wp-content/uploads/2024/04/SPECTRA-PRO.png' },
  { name: 'SPECTRA-PRO-934x1024.png', url: 'https://www.greenwave.org.in/wp-content/uploads/2024/04/SPECTRA-PRO-934x1024.png' },
  { name: 'SPECTRA-PRO-600x658.png', url: 'https://www.greenwave.org.in/wp-content/uploads/2024/04/SPECTRA-PRO-600x658.png' },
  { name: 'Scorpion.png', url: 'https://www.greenwave.org.in/wp-content/uploads/2024/05/Scorpion.png' },
  { name: 'Scorpion-869x1024.png', url: 'https://www.greenwave.org.in/wp-content/uploads/2024/05/Scorpion-869x1024.png' },
  { name: 'Scorpion-600x707.png', url: 'https://www.greenwave.org.in/wp-content/uploads/2024/05/Scorpion-600x707.png' },
  { name: 'Sparkle-Fancy.png', url: 'https://www.greenwave.org.in/wp-content/uploads/2024/04/Sparkle-Fancy.png' },
  { name: 'Sparkle-Fancy-1024x1013.png', url: 'https://www.greenwave.org.in/wp-content/uploads/2024/04/Sparkle-Fancy-1024x1013.png' },
  { name: 'Greewave-Starlite-768x1024.png', url: 'https://www.greenwave.org.in/wp-content/uploads/2024/04/Greewave-Starlite-768x1024.png' },
  { name: 'Greewave-Starlite.png', url: 'https://www.greenwave.org.in/wp-content/uploads/2024/04/Greewave-Starlite-1536x2048.png' },
  { name: 'Home-image.jpg', url: 'https://www.greenwave.org.in/wp-content/uploads/2024/04/Home-image.jpg' }
];

async function download() {
  const dir = path.join(__dirname, '../assets/images');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const item of imagesToDownload) {
    try {
      console.log(`Downloading ${item.name} from ${item.url}...`);
      const res = await fetch(item.url);
      if (!res.ok) {
        console.error(`Failed ${item.name}: ${res.status} ${res.statusText}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      const dest = path.join(dir, item.name);
      fs.writeFileSync(dest, buffer);
      console.log(`Saved ${item.name} (${buffer.length} bytes)`);
    } catch (e) {
      console.error(`Error downloading ${item.name}:`, e.message);
    }
  }
}

download().catch(console.error);
