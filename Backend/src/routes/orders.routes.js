import { Router } from "express";
import verifyJwt from "../middlewares/verifyJwt.middleware.js";
import { cancelOrder, getAllOrders, placeOrder, togglePaymentStatus } from "../controllers/order.controller.js";

const orderRoutes = Router();

orderRoutes.route("/place-order").post(verifyJwt, placeOrder)

orderRoutes.route("/update-payment-status").patch(togglePaymentStatus)

orderRoutes.route("/cancel-order").delete(verifyJwt, cancelOrder)

orderRoutes.route("/get-orders").get(verifyJwt, getAllOrders)

export { orderRoutes }