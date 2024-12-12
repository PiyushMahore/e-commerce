import mongoose from "mongoose";
import { DB_NAME } from "../constrant.js";

const dbConnect = async () => {
    try {
        const file = await mongoose.connect(`${process.env.DB_URL}${DB_NAME}`);
        console.log("data base connected successfully", file.connection.name.toUpperCase());
    } catch (error) {
        console.log("Somthing went wrong while connecting Data Base");
        process.exit(1);
    }
}

export { dbConnect }
