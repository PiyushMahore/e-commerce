import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { Order } from "../models/orders.model.js";
import { User } from "../models/user.model.js";
import apiresponse from "../utils/apiResponse.js";

const placeOrder = asyncHandler(async (req, res) => {
    const { purchasedItems, transactionId } = req.body;

    if (![purchasedItems, buyersEmail, transactionId].some((field) => field?.trim() !== "")) {
        throw new apiError(400, "Incomplete fields")
    }

    const user = await User.findById(req.user._id)

    if (!user) {
        throw new apiError(404, "User not logged in")
    }

    const order = await Order.create({ buyersEmail: user.email, purchasedItems: purchasedItems, transactionId: transactionId })

    if (!order) {
        throw new apiError(500, "Somthing went wrong while placing the order")
    }

    return res
        .status(200)
        .json(new apiresponse(200, order, "Order Placed successfully"))
});

const togglePaymentStatus = asyncHandler(async (req, res) => {
    const orderId = req.params
    const { paymentStatus } = req.body;

    if (!orderId) {
        throw new apiError(400, "invalid order id");
    }

    const order = await Order.findById(orderId)

    if (!order) {
        throw new apiError(404, "No order found with this id")
    }

    if (!paymentStatus) {
        throw new apiError(400, "invalid payment status");
    }

    order.paymentStatus = paymentStatus;

    await order.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new apiresponse(200, order, "order details updated successfully"));
});

const cancelOrder = asyncHandler(async (req, res) => {
    const orderId = req.params

    if (!orderId) {
        throw new apiError(400, "invalid order id");
    }

    const order = await Order.findByIdAndDelete(orderId)

    if (!order) {
        throw new apiError(200, "no order found with this order id")
    }

    return res
        .status(200)
        .json(new apiresponse(200, [], "Order Cancel Successfully"));
});

const getAllOrders = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        throw new apiError(400, "user not logged in")
    }

    const orders = await Order.find({
        $where: {
            buyersEmail: user.email
        }
    })

    return res
        .status(200)
        .json(new apiresponse(200, orders, "orders fetched successfuly"));
})

export { placeOrder, togglePaymentStatus, cancelOrder, getAllOrders }
