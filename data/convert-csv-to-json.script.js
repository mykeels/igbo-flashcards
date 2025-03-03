/**
 * Convert words.csv to words.json
 */

const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(__dirname, 'words.csv');
const jsonFilePath = path.join(__dirname, 'words.json');

const csv = fs.readFileSync(csvFilePath, 'utf8');
const lines = csv.split('\n').map(line => line.split(',')).slice(1);

const json = lines.map(line => ({
    english: line[0],
    igbo: line[1],
    category: line[2].trim(),
}));

console.log(json);

fs.writeFileSync(jsonFilePath, JSON.stringify(json, null, 2));
