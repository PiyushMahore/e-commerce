import { app } from "./app.js";
import { dbConnect } from "./database/dbConnect.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

const Port = process.env.PORT || 3000

dbConnect()

    .then(() => {
        app.on('error', () => {
            console.log("failed to connect");
        });

        app.listen(Port, () => {
            console.log("server is listening at Port", Port);
        });
    });