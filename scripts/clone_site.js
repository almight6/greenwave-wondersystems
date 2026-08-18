const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const BASE_URL = 'https://www.wondersystemsindia.com/';
const ROOT_DIR = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');

const DIRS = {
  css: path.join(ASSETS_DIR, 'css'),
  js: path.join(ASSETS_DIR, 'js'),
  images: path.join(ASSETS_DIR, 'images'),
  fonts: path.join(ASSETS_DIR, 'fonts'),
};

// Recreate clean asset folders
for (const dir of Object.values(DIRS)) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': '*/*',
  'Accept-Language': 'en-US,en;q=0.9',
};

function fetchBuffer(urlStr, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error(`Too many redirects for ${urlStr}`));
    try {
      const parsed = new URL(urlStr);
      const client = parsed.protocol === 'http:' ? http : https;
      const req = client.get(urlStr, { headers }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, urlStr).href;
          return resolve(fetchBuffer(redirectUrl, maxRedirects - 1));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${urlStr}`));
        }
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      });
      req.on('error', reject);
      req.setTimeout(25000, () => {
        req.destroy();
        reject(new Error(`Timeout fetching ${urlStr}`));
      });
    } catch (e) {
      reject(e);
    }
  });
}

function fetchText(urlStr) {
  return fetchBuffer(urlStr).then(buf => buf.toString('utf-8'));
}

const urlToRelPath = new Map(); // url -> localRelativePath
const filenameUsage = new Map(); // filename -> originalUrl

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

function getAssetLocalPath(urlStr, type) {
  if (urlToRelPath.has(urlStr)) {
    return urlToRelPath.get(urlStr);
  }

  let cleanUrl = urlStr.split('?')[0].split('#')[0];
  let ext = path.extname(cleanUrl);
  let base = path.basename(cleanUrl, ext);
  
  if (!ext) {
    if (type === 'css') ext = '.css';
    else if (type === 'js') ext = '.js';
    else if (type === 'images') ext = '.png';
    else if (type === 'fonts') ext = '.woff2';
  }

  let filename = sanitizeFilename(base + ext);
  if (!filename || filename === ext) {
    filename = 'asset_' + Math.random().toString(36).substring(2, 9) + ext;
  }

  // If this exact filename was used for a DIFFERENT URL, generate a numbered suffix
  if (filenameUsage.has(filename) && filenameUsage.get(filename) !== urlStr) {
    let counter = 1;
    while (filenameUsage.has(`${base}_${counter}${ext}`) && filenameUsage.get(`${base}_${counter}${ext}`) !== urlStr) {
      counter++;
    }
    filename = `${base}_${counter}${ext}`;
  }

  filenameUsage.set(filename, urlStr);
  const relativePath = `assets/${type}/${filename}`;
  urlToRelPath.set(urlStr, relativePath);
  return relativePath;
}

async function downloadAsset(urlStr, type) {
  try {
    const fullUrl = new URL(urlStr, BASE_URL).href;
    if (urlToRelPath.has(fullUrl)) {
      return urlToRelPath.get(fullUrl);
    }
    
    const localRelPath = getAssetLocalPath(fullUrl, type);
    const destPath = path.join(ROOT_DIR, localRelPath);

    console.log(`Downloading [${type}]: ${fullUrl} -> ${localRelPath}`);
    const buf = await fetchBuffer(fullUrl);
    fs.writeFileSync(destPath, buf);
    urlToRelPath.set(fullUrl, localRelPath);
    return localRelPath;
  } catch (err) {
    console.warn(`Failed to download ${urlStr}: ${err.message}`);
    return null;
  }
}

async function processCss(cssContent, sourceCssUrl) {
  const urlRegex = /url\(\s*(['"]?)(.*?)\1\s*\)/gi;
  let matches = [];
  let match;
  while ((match = urlRegex.exec(cssContent)) !== null) {
    matches.push(match);
  }

  for (const m of matches) {
    const rawUrl = m[2].trim();
    if (!rawUrl || rawUrl.startsWith('data:') || rawUrl.startsWith('#')) continue;

    try {
      const fullUrl = new URL(rawUrl, sourceCssUrl).href;
      let type = 'images';
      if (/\.(woff2?|ttf|eot|otf)($|\?)/i.test(rawUrl)) {
        type = 'fonts';
      } else if (/\.(css)($|\?)/i.test(rawUrl)) {
        type = 'css';
      }

      const localRelPath = await downloadAsset(fullUrl, type);
      if (localRelPath) {
        const cssToAssetRel = path.relative('assets/css', localRelPath).replace(/\\/g, '/');
        cssContent = cssContent.split(m[0]).join(`url("${cssToAssetRel}")`);
      }
    } catch (e) {
      console.warn(`Error resolving CSS url ${rawUrl}:`, e.message);
    }
  }

  return cssContent;
}

async function run() {
  console.log(`Fetching homepage from ${BASE_URL}...`);
  let html = await fetchText(BASE_URL);
  console.log(`Homepage fetched (${html.length} chars). Parsing resources...`);

  // 1. Extract and download CSS files
  const cssMatches = [
    ...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi),
    ...html.matchAll(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']stylesheet["']/gi)
  ];
  
  for (const match of cssMatches) {
    const rawHref = match[1];
    if (!rawHref) continue;
    try {
      const fullUrl = new URL(rawHref, BASE_URL).href;
      console.log(`Processing CSS: ${fullUrl}`);
      let cssContent = await fetchText(fullUrl);
      cssContent = await processCss(cssContent, fullUrl);
      
      const localRel = getAssetLocalPath(fullUrl, 'css');
      fs.writeFileSync(path.join(ROOT_DIR, localRel), cssContent, 'utf-8');
      urlToRelPath.set(fullUrl, localRel);
      
      html = html.split(match[0]).join(match[0].replace(rawHref, localRel));
    } catch (e) {
      console.warn(`Failed to process stylesheet ${rawHref}:`, e.message);
    }
  }

  // 2. Extract and download JS files
  const jsMatches = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)];
  for (const match of jsMatches) {
    const rawSrc = match[1];
    if (!rawSrc || rawSrc.includes('google-analytics.com') || rawSrc.includes('googletagmanager.com')) continue;
    try {
      const fullUrl = new URL(rawSrc, BASE_URL).href;
      const localRel = await downloadAsset(fullUrl, 'js');
      if (localRel) {
        html = html.split(match[0]).join(match[0].replace(rawSrc, localRel));
      }
    } catch (e) {
      console.warn(`Failed to process script ${rawSrc}:`, e.message);
    }
  }

  // 3. Extract and download Images (img src, srcset, icon links, data-src, preload)
  const imgMatches = [
    ...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi),
    ...html.matchAll(/<img[^>]+data-src=["']([^"']+)["']/gi),
    ...html.matchAll(/<link[^>]+rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]+href=["']([^"']+)["']/gi),
    ...html.matchAll(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi),
    ...html.matchAll(/<link[^>]+rel=["']preload["'][^>]+href=["']([^"']+)["']/gi)
  ];

  for (const match of imgMatches) {
    const rawSrc = match[1];
    if (!rawSrc || rawSrc.startsWith('data:')) continue;
    try {
      const fullUrl = new URL(rawSrc, BASE_URL).href;
      let type = 'images';
      if (/\.(woff2?|ttf|eot|otf)($|\?)/i.test(rawSrc)) {
        type = 'fonts';
      } else if (/\.(css)($|\?)/i.test(rawSrc)) {
        type = 'css';
      } else if (/\.(js)($|\?)/i.test(rawSrc)) {
        type = 'js';
      }
      const localRel = await downloadAsset(fullUrl, type);
      if (localRel) {
        html = html.split(rawSrc).join(localRel);
      }
    } catch (e) {
      console.warn(`Failed asset ${rawSrc}:`, e.message);
    }
  }

  // 4. Handle srcset attributes
  const srcsetMatches = [...html.matchAll(/srcset=["']([^"']+)["']/gi)];
  for (const match of srcsetMatches) {
    const rawSrcset = match[1];
    const parts = rawSrcset.split(',').map(p => p.trim());
    let newParts = [];
    for (const part of parts) {
      const [u, descriptor] = part.split(/\s+/);
      if (u && !u.startsWith('data:')) {
        try {
          const fullUrl = new URL(u, BASE_URL).href;
          const localRel = await downloadAsset(fullUrl, 'images');
          if (localRel) {
            newParts.push(descriptor ? `${localRel} ${descriptor}` : localRel);
          } else {
            newParts.push(part);
          }
        } catch (e) {
          newParts.push(part);
        }
      } else {
        newParts.push(part);
      }
    }
    html = html.split(match[0]).join(`srcset="${newParts.join(', ')}"`);
  }

  // 5. Extract background-image url(...) in inline styles
  const inlineBgMatches = [...html.matchAll(/url\(\s*(['"]?)(https?:\/\/[^'"\)]+)\1\s*\)/gi)];
  for (const match of inlineBgMatches) {
    const rawUrl = match[2];
    try {
      const fullUrl = new URL(rawUrl, BASE_URL).href;
      let type = 'images';
      if (/\.(woff2?|ttf|eot|otf)($|\?)/i.test(rawUrl)) type = 'fonts';
      const localRel = await downloadAsset(fullUrl, type);
      if (localRel) {
        html = html.split(match[0]).join(`url("${localRel}")`);
      }
    } catch (e) {
      console.warn(`Failed inline url ${rawUrl}:`, e.message);
    }
  }

  // 6. Generic pass for any remaining wondersystemsindia.com/wp-content/ URLs
  const genericMatches = [...html.matchAll(/https?:\/\/(?:www\.)?wondersystemsindia\.com\/wp-content\/[^\s"'\)<>]+/gi)];
  for (const match of genericMatches) {
    const rawUrl = match[0];
    try {
      const fullUrl = new URL(rawUrl, BASE_URL).href;
      let type = 'images';
      if (/\.(woff2?|ttf|eot|otf)($|\?)/i.test(rawUrl)) type = 'fonts';
      else if (/\.(css)($|\?)/i.test(rawUrl)) type = 'css';
      else if (/\.(js)($|\?)/i.test(rawUrl)) type = 'js';
      
      const localRel = await downloadAsset(fullUrl, type);
      if (localRel) {
        html = html.split(rawUrl).join(localRel);
      }
    } catch (e) {
      console.warn(`Failed generic asset ${rawUrl}:`, e.message);
    }
  }

  // 7. Clean external tracking / analytics tags
  html = html.replace(/<script[^>]*googletagmanager\.com[^>]*>.*?<\/script>/gis, '');
  html = html.replace(/<script[^>]*google-analytics\.com[^>]*>.*?<\/script>/gis, '');

  // Save index.html
  const indexPath = path.join(ROOT_DIR, 'index.html');
  fs.writeFileSync(indexPath, html, 'utf-8');
  console.log(`\nSuccessfully created cloned index.html at ${indexPath}!`);
  console.log(`Total downloaded assets: ${urlToRelPath.size}`);
}

run().catch(err => {
  console.error('Fatal error during cloning:', err);
  process.exit(1);
});
