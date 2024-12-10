const express = require("express");
const http = require("http");
const cors = require("cors");
const sequelize = require("./models/ConfigDataBase");
const { Routes } = require("./routers/Router");
const path = require("path");

class Application {
  #app;
  constructor(PORT) {
    this.#app = express();
    this.configApplication();
    this.createServer(PORT);
  }

  configApplication() {
    this.#app.use(cors());
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    this.#app.use("/", Routes);
  }

  createServer(PORT) {
    const server = http.createServer(this.#app);
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    sequelize
      .sync({ force: false })
      .then(() => {
        console.log("Connected to the database successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  }
}

module.exports = Application;
