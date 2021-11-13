/** @format */

const multer = require("multer");
const gravatar = require("gravatar");
const path = require("path");

const uploadDir = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    try {
      const name = path.parse(file.originalname);
      cb(null, `${Date.now()}${name.base}`);
    } catch (error) {}
  },
  limits: {
    fileSize: 2098576,
  },
});

function compressImg() {}

exports.upload = multer({ storage });
