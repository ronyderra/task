import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import router from "./routes/routes"
import { Server } from "socket.io";
import http from "http";
import { sendPair, socketsHandler } from "./services/lobby"
import cron from "node-cron";
config();

const port = process.env.PORT || 3030;
const URL: string = process.env.DB_URL || "";
const app = express();
app.use(express.json());
app.use(express.urlencoded());

//TODO- secure routes
// var whitelist = [
//     "http://localhost",
//     "127.0.0.1",
// ];

app.use(cors());
app.use("/", router);
const server = http.createServer(app);
const clientAppSocket = new Server(server, {
    cors: {
        origin: "*",
    },
});
socketsHandler(clientAppSocket)


export default server.listen(port, () => {
    console.log(`Server runs on port ${port}`);
});

const options: any = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set('strictQuery', true);
mongoose.connect(URL, options)
const connection = mongoose.connection;
connection.on("error", (err) => console.error("connection error: ", err));
connection.once("open", () => {
    console.log("connected to: ", connection.name)
    connection.db.collection('users').createIndex({ wins: -1 });
    sendPair(clientAppSocket)
});