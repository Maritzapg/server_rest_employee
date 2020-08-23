import express = require("express");
import path = require("path");
import bodyParser = require("body-parser");
const cors = require("cors");

export default class Server {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  static init(port: number) {
    return new Server(port);
  }

  private publicFolder() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    const publicPath = path.resolve(__dirname, "../public");

    this.app.use(express.static(publicPath));
  }

  start(callback: Function) {
    this.app.listen(this.port, callback());

    // Add headers
    this.app.use(cors());

    this.publicFolder();
  }
}
