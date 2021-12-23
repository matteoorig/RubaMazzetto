
const net = require("net");

//in ascolto
const PeerHandlerListener = net.createServer();
var socket = null;

PeerHandlerListener.on("connection", (so) => {
    socket = so;
    socket.on("data", (data) =>{
        console.log("[SERVER] " + data);
    });
});

PeerHandlerListener.listen(8889, ()=>{
    console.log("[PeerHandlerListener] pronto");
});
