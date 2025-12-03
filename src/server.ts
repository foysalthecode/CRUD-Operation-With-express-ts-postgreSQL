import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { useRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
const port = config.port;
app.use(express.json());

//initializing db
initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next level developer!");
});

//* USERS CRUD
app.use("/users", useRoutes);

//* TODOS CRUD
app.use("/todos", todoRoutes);

//* auth CRUD
app.use("/auth", authRoutes);

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
