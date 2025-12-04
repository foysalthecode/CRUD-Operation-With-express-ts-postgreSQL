import express, { Request, Response } from "express";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { useRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
app.use(express.json());

initDB();     //* initializing db

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next level developer!");
});

app.use("/users", useRoutes);   //* USERS CRUD

app.use("/todos", todoRoutes);  //* TODOS CRUD

app.use("/auth", authRoutes);  //* auth CRUD

app.use((req, res) => {        //! not found route
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    path: req.path,
  });
});

export default app;
