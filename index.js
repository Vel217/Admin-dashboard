import express from "express";
import mysql from "mysql2";
import cors from "cors";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { config } from "dotenv";

config();

let session = {};

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  insecureAuth: true,
});

const app = express();
app.use(express.json());
app.use(express.static("./users_app/build"));

app.use(
  cors({
    origin: process.env.REACT_APP_FRONTEND_URL,
    credentials: true,
  })
);

const query = async (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, rows, fields) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

app.post("/block", async (req, res) => {
  const id_list = req.body.join(",");

  try {
    const result = await query(
      `UPDATE usersList SET is_blocked = '1' WHERE user_id IN (${id_list});`
    );

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post("/unblock", async (req, res) => {
  const id_list = req.body.join(",");

  try {
    const result = await query(
      `UPDATE usersList SET is_blocked = '0' WHERE user_id IN (${id_list});`
    );

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/update", async (req, res) => {
  let id = req.body.number;
  try {
    const result = await query(
      `UPDATE usersList SET last_activity = CURRENT_TIMESTAMP WHERE user_id = '${id}'`
    );

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/delete", async (req, res) => {
  const id_list = req.body.join(",");

  try {
    const result = await query(
      `DELETE FROM usersList  WHERE user_id IN ( ${id_list});`
    );

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/list", async (req, res) => {
  try {
    const sessionID = req.headers.cookie?.split("=")[1];
    const userSession = session[sessionID];

    const result = await query("SELECT * FROM usersList");

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/signUp", async (req, res) => {
  const fName = req.body.firstname;
  const lName = req.body.lastname;
  const email = req.body.email;
  const password = crypto
    .createHash("sha3-256")
    .update(req.body.password)
    .digest("hex");

  try {
    const result = await query(
      `SELECT * FROM usersList WHERE email = '${email}';`
    );
    if (result.length > 0) {
      return res.status(400).send({ email: 1 });
    } else {
      const result2 = await query(
        `INSERT INTO usersList (firstname, lastname, email, password) VALUES ('${fName}', '${lName}', '${email}', '${password}');`
      );

      res.send(result2);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/logout", async (req, res) => {
  res.clearCookie("session");
  session = {};

  res.send("good");
});

app.post("/signIn", async (req, res) => {
  const email = req.body.email;
  const password = crypto
    .createHash("sha3-256")
    .update(req.body.password)
    .digest("hex");
  const sessionID = uuidv4();
  session[sessionID] = email;

  try {
    const result = await query(
      `SELECT EXISTS(SELECT * FROM usersList WHERE email = '${email}') AS result;`
    );

    if (result[0].result == 0) {
      return res.status(203).send({ email: "invalid" });
    }
    const result2 = await query(
      `SELECT * FROM usersList WHERE email = '${email}'`
    );

    if (result2[0].password !== password) {
      return res.status(400).send({ password: "invalid" });
    }

    res.set(
      "Set-Cookie",
      `session=${sessionID};Domain=task-4-rodina.herokuapp.com;Path=/; SameSite=None; Secure;`
    );

    res.send(result2);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "./users_app/build" });
});

app.listen(process.env.PORT, () => {
  connection.connect((err) => {
    console.log(err);
  });
});
