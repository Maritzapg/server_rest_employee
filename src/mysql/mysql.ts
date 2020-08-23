import mysql from "mysql";

export default class MySQL {
  private static _instance: MySQL;

  cnn: mysql.Connection;
  connected: boolean = false;

  constructor() {
    console.log("Class initialized");

    this.cnn = mysql.createConnection({
      host: "localhost",
      user: "rest_employee_admin",
      password: "*rest_employee_admin*",
      database: "restaurant_employees",
    });

    this.connectDB();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  static executeQuery(query: string, callback: Function) {
    this.instance.cnn.query(query, (err, results: Object[], fields) => {
      if (err) {
        console.log("Query error");
        console.log(err);
        return callback(err);
      }

      if (results.length === 0) callback("No rows");
      else callback(null, results);
    });
  }

  private connectDB() {
    this.cnn.connect((err: mysql.MysqlError) => {
      if (err) {
        console.log(err.message);
        return;
      }
      this.connected = true;
      console.log("BD online");
    });
  }
}
