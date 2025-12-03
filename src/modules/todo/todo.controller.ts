import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.createTodo(req.body);
    res.status(201).json({
      success: true,
      message: "Todo Created Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodo();
    res.status(200).json({
      success: true,
      message: "Todos retrived successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

const getSingeltodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getSingeltodo(req.params.id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        messsage: "Todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo Fatched Successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "todo not found",
    });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const result = await todoServices.updateTodo(
      title,
      req.params.id as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        messsage: "Todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo Updated Successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.deleteTodo(req.params.id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        messsage: "Todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo Deleted Successfully",
        data: null,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

export const todoController = {
  getTodo,
  createTodo,
  getSingeltodo,
  updateTodo,
  deleteTodo,
};
