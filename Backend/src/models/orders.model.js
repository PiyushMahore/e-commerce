import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        purchasedItems: {
            type: String,
            required: true
        },
        paymentStatus: {
            type: String,
            default: "Panding"
        },
        transactionId: {
            type: String,
            required: true
        },
        buyersEmail: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Order = mongoose.model("Order", orderSchema);