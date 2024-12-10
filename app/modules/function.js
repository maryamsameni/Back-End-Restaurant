const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

function hashString(str) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
}

function tokenGenerator(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "10 Days",
  });
  return token;
}

function tokenJwtVerfiy(token) {
  try {
    const result = jwt.verify(token, process.env.SECRET_KEY);
    return result;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return {
        status: 401,
        message: "توکن شما منقضی شده است. لطفا دوباره وارد شوید.",
      };
    } else {
      return { status: 401, message: "لطفا وارد حساب کاربری خود شوید" };
    }
  }
}

function createUploadPath() {
  let uploadPath = path.join(__dirname, "..", "uploads");
  fs.mkdirSync(uploadPath, { recursive: true });
  return uploadPath;
}

module.exports = {
  hashString,
  tokenGenerator,
  tokenJwtVerfiy,
  createUploadPath,
};
