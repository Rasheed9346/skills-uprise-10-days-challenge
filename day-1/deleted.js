const fs = require("fs");
const path = require("path");

const folderPath = "D:\\Camera Roll";

// Read all files inside the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    // Delete each file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting ${file}:`, err);
      } else {
        console.log(`${file} deleted successfully!`);
      }
    });
  });
});
