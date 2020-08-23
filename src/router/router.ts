import { Router, Request, Response } from "express";
import MySQL from "../mysql/mysql";
import bodyParser = require("body-parser");
const cors = require("cors");

const router = Router();

let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/areas", cors(), (req: Request, res: Response) => {
  const query = `SELECT * FROM areas`;

  MySQL.executeQuery(query, (err: any, areas: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    } else {
      res.json({
        ok: true,
        areas,
      });
    }
  });
});

router.get("/areas/:id", cors(), (req: Request, res: Response) => {
  const id = req.params.id;
  const escapeId = MySQL.instance.cnn.escape(id);

  const query = `SELECT * FROM areas WHERE id = ${escapeId}`;

  MySQL.executeQuery(query, (err: any, area: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    } else {
      res.json({
        ok: true,
        area,
      });
    }
  });
});

router.get("/document_types", cors(), (req: Request, res: Response) => {
  const query = `SELECT * FROM document_types`;

  MySQL.executeQuery(query, (err: any, document_types: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    } else {
      res.json({
        ok: true,
        document_types,
      });
    }
  });
});

router.get("/employees", cors(), (req: Request, res: Response) => {
  const query = `SELECT * FROM employees`;

  MySQL.executeQuery(query, (err: any, employees: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    } else {
      res.json({
        ok: true,
        employees,
      });
    }
  });
});

router.get("/employees/:id", cors(), (req: Request, res: Response) => {
  const id = req.params.id;
  const escapeId = MySQL.instance.cnn.escape(id);

  const query = `SELECT * FROM employees WHERE id = ${escapeId}`;

  MySQL.executeQuery(query, (err: any, employee: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    } else {
      res.json({
        ok: true,
        employee,
      });
    }
  });
});

router.options("/employees", cors());
router.post("/employees", [cors(), urlencodedParser, jsonParser], (req: Request, res: Response) => {
  const {
    document_type_id,
    document,
    first_name1,
    first_name2,
    last_name1,
    last_name2,
    birth_date,
    area_id,
  } = req.body;

  const query = `INSERT INTO employees 
            (document_type_id, document, first_name1, first_name2, last_name1, last_name2, birth_date, area_id) 
            values 
            (${document_type_id}, '${document}', '${first_name1}', '${first_name2}', '${last_name1}', '${last_name2}', '${birth_date}', ${area_id})`;

  MySQL.executeQuery(query, (err: any, employee: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    } else {
      res.json({
        ok: true,
        employee,
      });
    }
  });
});

router.options("/employees/:id", cors());
router.put("/employees/:id", [urlencodedParser, jsonParser, cors()], (req: Request, res: Response) => {
  let { id } = req.params;
  const escapeId = MySQL.instance.cnn.escape(id);

  const {
    document_type_id,
    document,
    first_name1,
    first_name2,
    last_name1,
    last_name2,
    birth_date,
    area_id,
  } = req.body;

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

  MySQL.executeQuery(query, (err: any, employee: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    } else {
      res.json({
        ok: true,
        employee,
      });
    }
  });
});

router.delete("/employees/:id", cors(), (req: Request, res: Response) => {
  const id = req.params.id;
  const escapeId = MySQL.instance.cnn.escape(id);

  const query = `DELETE FROM employees WHERE id = ${escapeId}`;

  MySQL.executeQuery(query, (err: any, employee: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    } else {
      res.json({
        ok: true,
        employee,
      });
    }
  });
});

export default router;
