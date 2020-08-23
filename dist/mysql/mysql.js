"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class MySQL {
    constructor() {
        this.connected = false;
        console.log("Class initialized");
        this.cnn = mysql_1.default.createConnection({
            host: "localhost",
            user: "rest_employee_admin",
            password: "*rest_employee_admin*",
            database: "restaurant_employees",
        });
        this.connectDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static executeQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log("Query error");
                console.log(err);
                return callback(err);
            }
            if (results.length === 0)
                callback("No rows");
            else
                callback(null, results);
        });
    }
    connectDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log("BD online");
        });
    }
}
exports.default = MySQL;
