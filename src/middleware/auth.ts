import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log({ authToken: token });
    if (!token) {
      return res.status(401).json({
        message: "unauthorized access",
      });
    }
    const decoded = jwt.verify(token, config.jwtSecret as string);
    console.log({ decoded });
    next();
  };
};

export default auth;
