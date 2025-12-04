import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";

const router = express.Router();

router.post("/", userControllers.createUser);

router.get("/", logger, auth("admin"), userControllers.getUser);

router.get(
  "/:id",
  logger,
  auth("admin", "user"),
  userControllers.getSingleUser
);

router.put("/:id", userControllers.updateSingleUser);

router.delete("/:id", userControllers.deleteUser);

export const useRoutes = router;
