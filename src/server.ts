import express, { Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { useRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";

const app = express();
const port = config.port;
app.use(express.json());
// app.use(express.urlencoded());

//initializing db
initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next level developer!");
});

//* users post api
app.use("/users", useRoutes);
// app.post("/users", async (req: Request, res: Response) => {
//   const { name, email } = req.body;

//   try {
//     const result = await pool.query(
//       `INSERT INTO users(name,email) VALUES($1, $2) RETURNING *`,
//       [name, email]
//     );
//     res.status(201).json({
//       success: true,
//       messsage: "Data Inserted Successfully",
//       data: result.rows[0],
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       messsage: err.message,
//     });
//   }
// });

//* users get data

// app.get("/users", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`SELECT * FROM users`);
//     res.status(200).json({
//       success: true,
//       message: "Users retrived successfully",
//       data: result.rows,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//       details: err,
//     });
//   }
// });

//* get single user
// app.get("/users/:id",);
//* put api
// app.put("/users/:id",);
//* Delete api
// app.delete("/users/:id", );

// TODOS crud

//* todos post api


// app.post("/todos",);

//* get todos api

// app.get("/todos",);
app.use("/todos", todoRoutes);

//* get single todo
// app.get("/todos/:id", );

//* put todo api
// app.put("/todos/:id",);

//* delete todo api

// app.delete("/todos/:id", );

//not found route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
