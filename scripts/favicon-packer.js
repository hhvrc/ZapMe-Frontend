const fs = require('fs');
const pack = require('ico-packer');
const resizeImg = require('resize-img');
const resizeOf = require('image-size');

// Get input parameters: base-file [sizes]
const args = process.argv.slice(2);

// Get the base file
const baseFile = args[0];

// Get the sizes, sort them, dedupe them, and convert them to numbers
const sizes = args
  .slice(1)
  .sort((a, b) => a - b)
  .filter((v, i, a) => a.indexOf(v) === i)
  .map((v) => parseInt(v));

// Make sure that the base file exists, and is square
if (!fs.existsSync(baseFile)) {
  console.error(`Base file '${baseFile}' does not exist`);
  process.exit(1);
}

const baseSize = resizeOf(baseFile);
if (baseSize.width !== baseSize.height) {
  console.error(`Base file '${baseFile}' is not square`);
  process.exit(1);
}

// Make sure that all sizes are between 16 and 256, and that they are at least half the size of the base file
for (let i = 0; i < sizes.length; i++) {
  const size = sizes[i];
  if (size < 16 || size > 256) {
    console.error(`Size '${size}' is not between 16 and 256`);
    process.exit(1);
  }
  if (size > baseSize.width / 2) {
    console.error(`Size '${size}' is less than half the size of the base file`);
    process.exit(1);
  }
}

async function DoWork() {
  // Read the base file
  const baseData = fs.readFileSync(baseFile);

  // Create map of sizes to files
  const files = [];

  // Resize the base file to each size
  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];

    console.log(`Resizing to ${size}x${size}`);

    const data = await resizeImg(baseData, { width: size, height: size });

    // Add the file to the map
    files.push(data);
  }

  const ico = pack(files);

  fs.writeFileSync('favicon.ico', ico);
}

DoWork();
