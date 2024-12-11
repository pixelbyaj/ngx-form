const fs = require('fs');
const path = require("path");

const paths = [];
process.argv.forEach(function (val, index, array) {
    if (index > 1) {
        paths.push(val);
    }
});
const sourceFolder = path.join(__dirname, paths[0]);
const destinationFolder = path.join(__dirname, paths[1]);
const targetExtension = '.scss'; // Change this to your desired extension
console.log(sourceFolder);
console.log(destinationFolder);

fs.mkdir(destinationFolder, { recursive: true }, (err) => {
    if (err) {
        console.error('Error creating folder:', err);
    } else {
        console.log(`Folder created at ${destinationFolder}`);
    }
});

fs.readdir(sourceFolder, (err, files) => {
    if (err) {
        console.error('Error reading source folder:', err);
        return;
    }

    files.forEach(file => {
        const sourceFilePath = path.join(sourceFolder, file);
        const destinationFilePath = path.join(destinationFolder, file);


        fs.stat(sourceFilePath, (err, stats) => {
            if (err) {
                console.error('Error getting file stats:', err);
                return;
            }

            if (stats.isFile() && path.extname(file) === targetExtension) {
                fs.rename(sourceFilePath, destinationFilePath, moveErr => {
                    if (moveErr) {
                        console.error('Error moving file:', moveErr);
                        return;
                    }
                    console.log(`Moved ${file} to ${destinationFolder}`);
                });
            }
        });
    });
});

fs.rm(sourceFolder, { recursive: true }, (err) => {
    if (err) {
      console.error('Error deleting folder:', err);
    } else {
      console.log(`Folder deleted at ${sourceFolder}`);
    }
  });