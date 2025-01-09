import { Router } from "express";
import { checkout } from "../controllers/order.controller.js";
import verifyJwt from "../middlewares/verifyJwt.middleware.js";

const orderRoutes = Router();

orderRoutes.route("/checkout").post(verifyJwt, checkout)

export { orderRoutes }