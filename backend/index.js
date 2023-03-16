import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("hello expr");
});
app.listen(5001, () => {
  console.log("port run ");
});
// const port = 3000;

// const query = (sql, callback) => {
//   const connection = mysql.createConnection({
//     host: "localhost:3306",
//     user: "root",
//     password: "9270077607Vel",
//     database: "users",
//     insecureAuth: true,
//   });

//   connection.connect();

//   connection.query(sql, (err, rows, fields) => {
//     if (err) throw err;
//     callback(rows);
//   });

//   connection.end();
// };
