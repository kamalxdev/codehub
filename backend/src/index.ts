import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "dotenv";



// Configuring the environment variables
config();



// Express Server

const app = express();




// Configuring Socket Server
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" }});
const PORT =process.env.PORT







// Socket Connection
io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);
});




// Listening on PORT
httpServer.listen(PORT,()=> console.log(`Server is running on port ${PORT}`));

