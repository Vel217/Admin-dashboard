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

const query = async (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, rows, fields) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

app.get("/", async (req, res) => {
  try {
    const result = await query("SELECT * FROM users");
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(5001, () => {
  console.log("port run ");
  connection.connect((err) => {
    console.log(err);
  });
});
