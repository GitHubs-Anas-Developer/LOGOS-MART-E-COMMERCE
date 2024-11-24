// backend/middleware/upload.js
const multer = require("multer");
const storage = multer.diskStorage({
  /* Configuration options */
});
const upload = multer({ storage });

module.exports = upload;
