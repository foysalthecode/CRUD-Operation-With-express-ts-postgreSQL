import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req.body);
    res.status(201).json({
      success: true,
      messsage: "Data Inserted Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      messsage: err.message,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    res.status(200).json({
      success: true,
      message: "Users retrived successfully",
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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getSingleuser(req.params.id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        messsage: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Fatched Successfully",
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

const updateSingleUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await userServices.updateSingleUser(
      name,
      email,
      req.params.id as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        messsage: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Updated Successfully",
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

const deleteUser = async (req: Request, res: Response) => {
  // console.log(req.params);
  try {
    const result = await userServices.deleteUser(req.params.id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        messsage: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
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
export const userControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateSingleUser,
  deleteUser,
};
