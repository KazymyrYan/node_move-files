const fs = require('fs');
const path = require('path');

function moveFiles() {
  const [source, destination] = process.argv.slice(2);

  try {
    let finalDest = destination;

    if (destination.endsWith('/')) {
      if (
        !fs.existsSync(destination) ||
        !fs.statSync(destination).isDirectory()
      ) {
        throw new Error('Destination directory does not exist');
      }

      finalDest = path.join(destination, path.basename(source));

      fs.renameSync(source, finalDest);

      return;
    }

    if (fs.existsSync(destination) && fs.statSync(destination).isDirectory()) {
      finalDest = path.join(destination, path.basename(source));
    }

    fs.renameSync(source, finalDest);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
}

moveFiles();
