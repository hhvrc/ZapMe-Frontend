// Cleans the OpenAPI file to rmove bad string formatting
import { readFileSync, unlinkSync, writeFileSync } from 'fs';

// Get arguments
const args = process.argv.slice(2);

// Get the path to the OpenAPI file
const openApiPath = args[0];

if (!openApiPath) throw new Error('No OpenAPI file path specified!');

// Read the file
const openApiFile = readFileSync(openApiPath, 'utf8');
const lines = openApiFile.split(/\r?\n/);

// Find all instances of the localVarPath string formatting code, and capture the path
const localVarPathRegex = /^(\s*)const localVarPath = `([^`]*)`/;
const dotReplaceMethodRegex = /\.replace\(`{\$\{"([^"]*)"}}`, encodeURIComponent\(String\(([^\)]*)\)\)\)/;

// We want to turn this:
// const localVarPath = `/api/v1/clients/{clientId}/contacts/{contactId}`
//    .replace(`{$"clientId"}`, encodeURIComponent(String(clientId)))
//    .replace(`{$"contactId"}`, encodeURIComponent(String(contactId)));
//
// Into this:
// const localVarPath = `/api/v1/clients/${encodeURIComponent(String(clientId))}/contacts/${encodeURIComponent(String(contactId))}`;

let newFileLines = [];

for (let i = 0; i < lines.length; i++) {
  // Get the current line
  let line = lines[i];

  const localVarPathMatch = line.match(localVarPathRegex);
  if (!localVarPathMatch) {
    newFileLines.push(line);
    continue;
  }

  // Get the path
  let ws = localVarPathMatch[1];
  let path = localVarPathMatch[2];

  let replaceKVPairs = [];

  // Get the next .replace statement(s)
  while (++i < lines.length) {
    // if the line ends with a ';' then we're done (strip before checking)
    let drLine = lines[i].trim();

    const replaceMatch = drLine.match(dotReplaceMethodRegex);
    if (!replaceMatch) {
      i--;
      break;
    }

    // Get the key and value
    const key = replaceMatch[1];
    const value = replaceMatch[2];

    // Add the key/value pair to the array
    replaceKVPairs.push({ key, value });

    if (drLine.endsWith(';')) {
      break;
    }
  }

  // Do the key/value replacements
  for (let k = 0; k < replaceKVPairs.length; k++) {
    const kvp = replaceKVPairs[k];
    path = path.replace(`{${kvp.key}}`, `\${encodeURIComponent(String(${kvp.value}))}`);
  }

  // Replace the line
  newFileLines.push(ws + `const localVarPath = \`${path}\`;`);
}

const newFileText = newFileLines.join('\n');

// Delete the old file
unlinkSync(openApiPath);

// Write the new file
writeFileSync(openApiPath, newFileText, 'utf8');
