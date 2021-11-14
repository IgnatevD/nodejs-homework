/** @format */

const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");
const { BadRequest } = require("http-errors");

const uploadDir = path.join(__dirname, "../../public/avatars");
const draftDir = path.join(__dirname, "../../drafts");

const storage = multer.diskStorage({
  destination: draftDir,
  filename: (req, file, cb) => {
    if (!file.mimetype.includes("image")) cb(new BadRequest("Only image"));
    const name = path.parse(file.originalname);
    cb(null, `${Date.now()}${name.base}`);
  },
  limits: {
    fileSize: 2098576,
  },
});

exports.upload = multer({ storage });

async function compressImg(req, _, next) {
  if (!req.file) {
    return next();
  }
  const draftFilePath = req.file.path;
  const file = await Jimp.read(draftFilePath);
  await fs.unlink(draftFilePath);

  const imgCompressPath = path.join(uploadDir, req.file.filename);
  await file.resize(250, 250).quality(60).writeAsync(imgCompressPath);
  next();
}

exports.compressImg = compressImg;
