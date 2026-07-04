import "./config/env";

import express, { Request, Response } from "express";
import http from "http";

import connectDB from "./config/db";
import allRoutes from "./routes/allRoutes";

import { initializeSocket } from "./socket/socket";
import { registerSocketEvents } from "./socket";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
    return res.status(200).json({
        status: true,
        message: "Server is healthy",
    });
});

app.use("/api/v1", allRoutes);

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
const io = initializeSocket(server);

// Register all socket events
registerSocketEvents(io);

server.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});