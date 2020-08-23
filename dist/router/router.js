"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express_1.Router();
let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get("/areas", cors(), (req, res) => {
    const query = `SELECT * FROM areas`;
    mysql_1.default.executeQuery(query, (err, areas) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err,
            });
        }
        else {
            res.json({
                ok: true,
                areas,
            });
        }
    });
});
router.get("/areas/:id", cors(), (req, res) => {
    const id = req.params.id;
    const escapeId = mysql_1.default.instance.cnn.escape(id);
    const query = `SELECT * FROM areas WHERE id = ${escapeId}`;
    mysql_1.default.executeQuery(query, (err, area) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err,
            });
        }
        else {
            res.json({
                ok: true,
                area,
            });
        }
    });
});
router.get("/document_types", cors(), (req, res) => {
    const query = `SELECT * FROM document_types`;
    mysql_1.default.executeQuery(query, (err, document_types) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err,
            });
        }
        else {
            res.json({
                ok: true,
                document_types,
            });
        }
    });
});
router.get("/employees", cors(), (req, res) => {
    const query = `SELECT * FROM employees`;
    mysql_1.default.executeQuery(query, (err, employees) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err,
            });
        }
        else {
            res.json({
                ok: true,
                employees,
            });
        }
    });
});
router.get("/employees/:id", cors(), (req, res) => {
    const id = req.params.id;
    const escapeId = mysql_1.default.instance.cnn.escape(id);
    const query = `SELECT * FROM employees WHERE id = ${escapeId}`;
    mysql_1.default.executeQuery(query, (err, employee) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err,
            });
        }
        else {
            res.json({
                ok: true,
                employee,
            });
        }
    });
});
router.options("/employees", cors());
router.post("/employees", [cors(), urlencodedParser, jsonParser], (req, res) => {
    const { document_type_id, document, first_name1, first_name2, last_name1, last_name2, birth_date, area_id, } = req.body;
    const query = `INSERT INTO employees 
            (document_type_id, document, first_name1, first_name2, last_name1, last_name2, birth_date, area_id) 
            values 
            (${document_type_id}, '${document}', '${first_name1}', '${first_name2}', '${last_name1}', '${last_name2}', '${birth_date}', ${area_id})`;
    mysql_1.default.executeQuery(query, (err, employee) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err,
            });
        }
        else {
            res.json({
                ok: true,
                employee,
            });
        }
    });
});
router.options("/employees/:id", cors());
router.put("/employees/:id", [urlencodedParser, jsonParser, cors()], (req, res) => {
    let { id } = req.params;
    const escapeId = mysql_1.default.instance.cnn.escape(id);
    const { document_type_id, document, first_name1, first_name2, last_name1, last_name2, birth_date, area_id, } = req.body;
    const query = `UPDATE employees SET
            document_type_id=${document_type_id}, 
            document='${document}', 
            first_name1='${first_name1}', 
            first_name2='${first_name2}', 
            last_name1='${last_name1}', 
            last_name2='${last_name2}', 
            birth_date='${birth_date}', 
            area_id=${area_id}
            WHERE id = ${escapeId}`;
    mysql_1.default.executeQuery(query, (err, employee) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err,
            });
        }
        else {
            res.json({
                ok: true,
                employee,
            });
        }
    });
});
//router.options("/employees/:id", cors());
router.delete("/employees/:id", cors(), (req, res) => {
    const id = req.params.id;
    const escapeId = mysql_1.default.instance.cnn.escape(id);
    const query = `DELETE FROM employees WHERE id = ${escapeId}`;
    mysql_1.default.executeQuery(query, (err, employee) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err,
            });
        }
        else {
            res.json({
                ok: true,
                employee,
            });
        }
    });
});
exports.default = router;
