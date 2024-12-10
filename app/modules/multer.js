const multer = require("multer");
const path = require("path");
const { createUploadPath } = require("./function");

const StorageMulter = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, createUploadPath());
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const UploadMulter = multer({
  storage: StorageMulter,
});

module.exports = { UploadMulter };
