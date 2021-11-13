/** @format */

const multer = require("multer");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const uploadDir = path.join(__dirname, "../../public/avatars");
const draftDir = path.join(__dirname, "../../drafts");

const storage = multer.diskStorage({
  destination: draftDir,
  filename: (req, file, cb) => {
    try {
      const name = path.parse(file.originalname);
      console.log(req.body);
      cb(null, `${Date.now()}${name.base}`);
    } catch (error) {}
  },
  limits: {
    fileSize: 2098576,
  },
});

exports.upload = multer({ storage });

const compressImg = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const draftFilePath = req.file.path;
  const file = await Jimp.read(draftFilePath);
  await fs.unlink(draftFilePath);
  const compressPath = path.join(uploadDir, req.file.filename);
  await file.resize(300, 300).quality(60).writeAsync(compressPath);

  req.file.destination = uploadDir;
  req.file.path = compressPath;

  next();
};

exports.compressImg = compressImg;
