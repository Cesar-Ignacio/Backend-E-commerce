import { Server } from "socket.io";
import { ProductsModelManager } from "./dao/products.mdb.js";
import { MessagesManager } from "./dao/messages.mdb.js";

const pmm=new ProductsModelManager();
const mm=new MessagesManager();
export const initSocketServer=(httpServer)=>{

    const io=new Server(httpServer);

    io.on("connection", async (socket) => {
        console.log("Cliente conectado");
        socket.emit("getProducts", await pmm.getAll());
        socket.emit("messages",await mm.getAll());
    })

    return io;
}