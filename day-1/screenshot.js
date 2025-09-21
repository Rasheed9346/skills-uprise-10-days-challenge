const screenshot = require("screenshot-desktop");
const path = require("path");

const filePath = path.join(__dirname, "screenshot.jpg");

// Take screenshot
screenshot({ filename: filePath })
  .then((imgPath) => {
    console.log("Screenshot saved at:", imgPath);
  })
  .catch((err) => {
    console.error("Error taking screenshot:", err);
  });
