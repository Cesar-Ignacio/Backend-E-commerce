import { Server } from "socket.io";
import { messageService, productService } from "./services/index.js";

export const initSocketServer=(httpServer)=>{

    const io=new Server(httpServer);

    io.on("connection", async (socket) => {
        console.log("Cliente conectado");
        socket.emit("getProducts", await productService.getPaginatedProducts(3,1,'{}',1));
        socket.emit("messages",await messageService.get());
    })

    return io;
}