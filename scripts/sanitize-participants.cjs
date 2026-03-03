/**
 * Sanitize participants.csv → participants.json
 * Strips sensitive columns and outputs only the fields needed by the UI.
 * Run as part of the prebuild step.
 */
const fs = require('fs');
const path = require('path');

const CSV_INPUT = path.resolve(__dirname, '../src/data/participants.csv');
const JSON_OUTPUT = path.resolve(__dirname, '../src/data/participants.json');

function parseCSV(text) {
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  // Parse header
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

function sanitize() {
  const csv = fs.readFileSync(CSV_INPUT, 'utf-8');
  const records = parseCSV(csv);

  const sanitized = records
    // .filter(r => r.Firstname || r.Lastname) // skip empty rows
    .map(r => ({
      firstName: r.Firstname || '',
      lastName: r.Lastname || '',
      sessionDate: r.SessionDate || '',
      timeRange: r.TimeRange || '',
      isParticipant: (r.Participant || '').toLowerCase() === 'true',
      isLOC: (r.LOC || '').toLowerCase() === 'true',
      isSOC: (r.SOC || '').toLowerCase() === 'true',
      isChair: (r.Chairs || '').toLowerCase() === 'true',
      organisation: r.Organisation || '',
      country: r.Country || '',
      title: r.Title || '',
    }))
    .sort((a, b) => a.lastName.localeCompare(b.lastName));

  fs.writeFileSync(JSON_OUTPUT, JSON.stringify(sanitized, null, 2));
  console.log(`✅ Sanitized ${sanitized.length} participants → ${JSON_OUTPUT}`);
}

sanitize();
