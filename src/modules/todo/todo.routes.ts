import express from "express";
import { todoController } from "./todo.controller";

const router = express.Router();

router.get("/", todoController.getTodo);

router.post("/", todoController.createTodo);

router.get("/:id", todoController.getSingeltodo);

router.put("/:id", todoController.updateTodo);

router.delete("/:id", todoController.deleteTodo);

export const todoRoutes = router;
