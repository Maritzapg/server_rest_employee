"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
    }
    static init(port) {
        return new Server(port);
    }
    publicFolder() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        const publicPath = path.resolve(__dirname, "../public");
        this.app.use(express.static(publicPath));
    }
    start(callback) {
        this.app.listen(this.port, callback());
        // Add headers
        this.app.use(cors());
        this.publicFolder();
    }
}
exports.default = Server;
