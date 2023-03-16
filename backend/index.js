import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

const connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "user",
  password: "password",
  database: "db",
  insecureAuth: true,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (err, rows, fields) => {
    if (err) res.send(err);
    else res.send(rows);
  });
});

app.listen(5001, () => {
  console.log("port run ");
  connection.connect((err) => {
    console.log(err);
  });
});
