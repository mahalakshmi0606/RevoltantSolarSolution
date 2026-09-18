/**
 * scripts/convert-and-replace.js
 *
 * One-shot script that:
 *  1. Finds all PNG files in public/ and src/
 *  2. Converts them to WebP (using sharp)
 *  3. REPLACES all references to .png with .webp inside:
 *     - .jsx / .js / .tsx / .ts / .html / .css files
 *  4. Skips: favicon, apple-touch-icon, manifest icons, og-image
 *  5. Keeps originals (safe) unless --delete is passed
 *
 * Usage:
 *   node scripts/convert-and-replace.js
 *   node scripts/convert-and-replace.js --delete     (delete original PNGs)
 *   node scripts/convert-and-replace.js --quality=90
 *   node scripts/convert-and-replace.js --dry        (preview only)
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// =========================================================
// CONFIG
// =========================================================

const PROJECT_ROOT = process.cwd();

// Folders to scan for PNG images
const IMAGE_FOLDERS = [
  'public',
  'src',
];

// Extensions to search for PNG references
const TEXT_FILE_EXTENSIONS = ['.jsx', '.js', '.tsx', '.ts', '.html', '.css', '.json'];

// Files/folders to NEVER touch
const SKIP_FOLDERS = ['node_modules', 'build', 'dist', '.git', 'coverage'];

// PNG filenames to NEVER convert (favicons, PWA icons, OG images)
const SKIP_IMAGES = [
  'favicon.ico',
  'favicon.png',
  'apple-touch-icon.png',
  'logo192.png',
  'logo512.png',
  'RevoltantLogo.webp',       // used as favicon + OG
  'manifest.json',
];

// CLI args
const args = process.argv.slice(2);
const DELETE_ORIGINALS = args.includes('--delete');
const DRY_RUN = args.includes('--dry');
const FORCE = args.includes('--force');
const qualityArg = args.find((a) => a.startsWith('--quality='));
const QUALITY = qualityArg ? Number(qualityArg.split('=')[1]) : 82;

// Colors
const c = {
  reset: '\x1b[0m', green: '\x1b[32m', yellow: '\x1b[33m',
  red: '\x1b[31m', cyan: '\x1b[36m', gray: '\x1b[90m', bold: '\x1b[1m',
};
const log = {
  info: (m) => console.log(`${c.cyan}ℹ${c.reset} ${m}`),
  ok:   (m) => console.log(`${c.green}✔${c.reset} ${m}`),
  warn: (m) => console.log(`${c.yellow}⚠${c.reset} ${m}`),
  err:  (m) => console.log(`${c.red}✖${c.reset} ${m}`),
  dim:  (m) => console.log(`${c.gray}${m}${c.reset}`),
};

// =========================================================
// HELPERS
// =========================================================

function walk(dir, extFilter, callback, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (SKIP_FOLDERS.includes(entry.name)) continue;
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, extFilter, callback, fileList);
    } else if (entry.isFile()) {
      if (!extFilter || extFilter.some((ext) => entry.name.toLowerCase().endsWith(ext))) {
        fileList.push(full);
        if (callback) callback(full);
      }
    }
  }
  return fileList;
}

function formatBytes(b) {
  if (b === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(b) / Math.log(k));
  return `${(b / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

function shouldSkipImage(filePath) {
  const base = path.basename(filePath).toLowerCase();
  return SKIP_IMAGES.some((skip) => base === skip.toLowerCase());
}

// =========================================================
// STEP 1: FIND ALL PNGs
// =========================================================

function findAllPngs() {
  const pngs = [];
  for (const folder of IMAGE_FOLDERS) {
    const dir = path.join(PROJECT_ROOT, folder);
    walk(dir, ['.png'], null, pngs);
  }
  return pngs.filter((p) => !shouldSkipImage(p));
}

// =========================================================
// STEP 2: CONVERT PNG → WEBP
// =========================================================

async function convertPng(pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp');

  if (fs.existsSync(webpPath) && !FORCE) {
    log.dim(`  ↳ Skipped (exists): ${path.relative(PROJECT_ROOT, webpPath)}`);
    return { status: 'skipped', pngPath, webpPath, originalSize: 0, webpSize: 0 };
  }

  if (DRY_RUN) {
    log.info(`  [DRY] Would convert: ${path.relative(PROJECT_ROOT, pngPath)}`);
    return { status: 'dry', pngPath, webpPath, originalSize: 0, webpSize: 0 };
  }

  try {
    const originalSize = fs.statSync(pngPath).size;

    await sharp(pngPath)
      .webp({ quality: QUALITY, effort: 5, smartSubsample: true })
      .toFile(webpPath);

    const webpSize = fs.statSync(webpPath).size;
    const pct = (((originalSize - webpSize) / originalSize) * 100).toFixed(1);

    log.ok(
      `  ↳ ${path.basename(pngPath)} → .webp ` +
      `(${formatBytes(originalSize)} → ${formatBytes(webpSize)}, -${pct}%)`
    );

    if (DELETE_ORIGINALS) {
      fs.unlinkSync(pngPath);
      log.dim(`     Deleted original`);
    }

    return { status: 'converted', pngPath, webpPath, originalSize, webpSize };
  } catch (err) {
    log.err(`  ↳ Failed: ${pngPath} — ${err.message}`);
    return { status: 'failed', pngPath, webpPath, originalSize: 0, webpSize: 0 };
  }
}

// =========================================================
// STEP 3: REPLACE REFERENCES IN TEXT FILES
// =========================================================

function replaceInFiles(convertedFiles) {
  // Build a map of basename → basename.webp
  const replacements = new Map();
  for (const f of convertedFiles) {
    if (f.status !== 'converted' && f.status !== 'skipped' && f.status !== 'dry') continue;
    const oldName = path.basename(f.pngPath);
    const newName = path.basename(f.webpPath);
    replacements.set(oldName, newName);
  }

  if (replacements.size === 0) {
    log.warn('No conversions to replace.');
    return 0;
  }

  let totalReplaced = 0;
  const textFiles = walk(path.join(PROJECT_ROOT, 'src'), TEXT_FILE_EXTENSIONS, null, []);
  textFiles.push(...walk(path.join(PROJECT_ROOT, 'public'), ['.html', '.json'], null, []));

  for (const file of textFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    let fileReplacements = 0;

    for (const [oldName, newName] of replacements) {
      // Match .png that appears after the base name (with word boundary)
      // Safer: only replace when full filename matches
      const regex = new RegExp(
        oldName.replace(/\.png$/i, '\\.png'),
        'gi'
      );
      const before = content;
      content = content.replace(regex, newName);
      if (content !== before) {
        const matches = (before.match(regex) || []).length;
        fileReplacements += matches;
      }
    }

    if (content !== original) {
      if (!DRY_RUN) {
        fs.writeFileSync(file, content, 'utf8');
      }
      log.ok(
        `  ↳ Updated ${path.relative(PROJECT_ROOT, file)} ` +
        `(${fileReplacements} replacement${fileReplacements !== 1 ? 's' : ''})`
      );
      totalReplaced += fileReplacements;
    }
  }

  return totalReplaced;
}

// =========================================================
// MAIN
// =========================================================

async function main() {
  console.log(`\n${c.bold}🖼️  PNG → WebP Converter + Replacer${c.reset}\n`);
  log.info(`Quality:       ${QUALITY}`);
  log.info(`Delete PNGs:   ${DELETE_ORIGINALS}`);
  log.info(`Force:         ${FORCE}`);
  log.info(`Dry run:       ${DRY_RUN}\n`);

  // Step 1
  log.info('Step 1: Finding PNG files...');
  const pngs = findAllPngs();
  log.info(`Found ${pngs.length} PNG file(s) to convert.\n`);

  if (pngs.length === 0) {
    log.warn('No PNGs to convert.\n');
    return;
  }

  // Step 2
  log.info('Step 2: Converting to WebP...');
  const results = [];
  let totalOrig = 0;
  let totalNew = 0;

  for (const png of pngs) {
    const res = await convertPng(png);
    results.push(res);
    if (res.status === 'converted') {
      totalOrig += res.originalSize;
      totalNew += res.webpSize;
    }
  }

  // Step 3
  console.log('');
  log.info('Step 3: Replacing references in code files...');
  const totalReplaced = replaceInFiles(results);

  // Summary
  console.log(`\n${c.bold}📊 Summary${c.reset}\n`);
  const converted = results.filter((r) => r.status === 'converted').length;
  const skipped = results.filter((r) => r.status === 'skipped').length;
  const failed = results.filter((r) => r.status === 'failed').length;

  console.log(`  Converted: ${c.green}${converted}${c.reset}`);
  console.log(`  Skipped:   ${c.yellow}${skipped}${c.reset}`);
  console.log(`  Failed:    ${c.red}${failed}${c.reset}`);

  if (totalOrig > 0) {
    const saved = totalOrig - totalNew;
    const pct = ((saved / totalOrig) * 100).toFixed(1);
    console.log(
      `\n  Original: ${formatBytes(totalOrig)}` +
      `\n  WebP:     ${formatBytes(totalNew)}` +
      `\n  ${c.green}Saved:    ${formatBytes(saved)} (${pct}%)${c.reset}`
    );
  }

  console.log(`\n  References replaced: ${c.green}${totalReplaced}${c.reset}`);

  if (!DELETE_ORIGINALS) {
    log.warn(`\nOriginal PNGs kept. Run with --delete to remove them.`);
  }

  console.log(`\n${c.green}${c.bold}✅ Done!${c.reset}\n`);
}

main().catch((err) => {
  log.err(`Fatal: ${err.message}`);
  process.exit(1);
});