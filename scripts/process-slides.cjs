/**
 * Process slides CSV → slides.json
 * Maps slide sharing links to speakers by matching filenames against participant names.
 *
 * Expected CSV format:
 *   Day,Speaker (File Name),Sharing Link
 *   Day1,Vorobyov.pptx,https://drive.google.com/...
 *
 * Run as part of the prebuild step.
 */
const fs = require('fs');
const path = require('path');

const SLIDES_CSV = path.resolve(__dirname, '../src/data/slides.csv');
const PARTICIPANTS_JSON = path.resolve(__dirname, '../src/data/participants.json');
const SLIDES_OUTPUT = path.resolve(__dirname, '../src/data/slides.json');

const DAY_TO_DATE = {
  Day1: '2026-03-16',
  Day2: '2026-03-17',
  Day3: '2026-03-18',
  Day4: '2026-03-19',
  Day5: '2026-03-20',
};

function parseCSV(text) {
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (const char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const record = {};
    headers.forEach((h, idx) => {
      record[h] = values[idx] || '';
    });
    records.push(record);
  }

  return records;
}

/**
 * Normalize a string for matching: lowercase, remove accents/diacritics, remove non-alpha chars.
 */
function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}

function processSlides() {
  if (!fs.existsSync(SLIDES_CSV)) {
    console.log('⏭️  No slides.csv found, skipping slides processing');
    fs.writeFileSync(SLIDES_OUTPUT, '[]');
    return;
  }

  const participants = JSON.parse(fs.readFileSync(PARTICIPANTS_JSON, 'utf-8'));
  const csvText = fs.readFileSync(SLIDES_CSV, 'utf-8');
  const slideRecords = parseCSV(csvText);

  // Build participant list with normalized names for matching
  const participantList = participants
    .filter(p => p.lastName)
    .map(p => ({
      ...p,
      normalizedLast: normalize(p.lastName),
      normalizedFirst: normalize(p.firstName),
      normalizedFull: normalize(p.firstName + p.lastName),
    }));

  const slides = [];
  const unmatched = [];

  for (const record of slideRecords) {
    const filename = record['Speaker (File Name)'] || '';
    const url = record['Sharing Link'] || '';
    const dayLabel = record['Day'] || '';

    if (!filename || !url) continue;

    const sessionDate = DAY_TO_DATE[dayLabel] || '';
    if (!sessionDate) {
      console.warn(`⚠️  Unknown day label "${dayLabel}" for file: ${filename}`);
      continue;
    }

    const normalizedFilename = normalize(filename);

    // Find all participants whose last name appears in the filename
    const candidates = participantList.filter(p =>
      normalizedFilename.includes(p.normalizedLast)
    );

    let matched = null;

    if (candidates.length === 1) {
      matched = candidates[0];
    } else if (candidates.length > 1) {
      // Disambiguate: prefer candidates whose first name also appears in the filename
      const withFirstName = candidates.filter(p =>
        normalizedFilename.includes(p.normalizedFirst)
      );
      if (withFirstName.length === 1) {
        matched = withFirstName[0];
      } else {
        // Further disambiguate by matching session date from the CSV
        const byDate = (withFirstName.length > 1 ? withFirstName : candidates)
          .filter(p => p.sessionDate === sessionDate);
        if (byDate.length === 1) {
          matched = byDate[0];
        } else {
          // Pick the one with the longest last name match (most specific)
          const sorted = candidates.sort((a, b) =>
            b.normalizedLast.length - a.normalizedLast.length
          );
          matched = sorted[0];
          console.warn(`⚠️  Ambiguous match for "${filename}" — picked ${matched.firstName} ${matched.lastName} (candidates: ${candidates.map(c => c.firstName + ' ' + c.lastName).join(', ')})`);
        }
      }
    }

    if (matched) {
      slides.push({
        lastName: matched.lastName,
        firstName: matched.firstName,
        sessionDate,
        url,
      });
    } else {
      unmatched.push(filename);
    }
  }

  fs.writeFileSync(SLIDES_OUTPUT, JSON.stringify(slides, null, 2));
  console.log(`✅ Processed ${slides.length} slide links → ${SLIDES_OUTPUT}`);
  if (unmatched.length > 0) {
    console.warn(`⚠️  Could not match ${unmatched.length} filenames: ${unmatched.join(', ')}`);
  }
}

processSlides();
