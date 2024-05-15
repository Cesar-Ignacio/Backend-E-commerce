import { Server } from "socket.io";
import { ProductManager } from "./class/ProductManager.js";

const pm=new ProductManager();

export const initSocketServer=(httpServer)=>{

    const io=new Server(httpServer);

    io.on("connection", async (socket) => {
        console.log("Cliente conectado");
        socket.emit("getProducts", await pm.getProducts())
    })

    return io;
}