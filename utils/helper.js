const path = require("path");
const fs = require("fs");

function getScreenshotPath(name) {
  const dir = path.resolve("screenshots");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return path.join(dir, `${name}-${Date.now()}.png`);
}

function loadTestData(filePath) {
  const resolved = path.resolve(filePath);
  return JSON.parse(fs.readFileSync(resolved, "utf8"));
}

module.exports = { getScreenshotPath, loadTestData };
