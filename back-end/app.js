const net = require("net");

var stato = 0; //stato=0 => può accettare richieste     stato=1 => non deve accettare richieste perchè già occupato
var CLIENT = null;
var HOST = null;

//in ascolto continuo
const PeerHandlerListener = net.createServer();
PeerHandlerListener.on("connection", (so) => {
    CLIENT = so;
    CLIENT.on("data", (data) =>{
        console.log("[SERVER] " + data);
        //non funge
        if(data.equals(Buffer.from("Hi"))){
            connect(8889, '127.0.0.1')
            console.log("ci siamo")
        }
    });
});

PeerHandlerListener.listen(8889, ()=>{
    console.log("[PeerHandlerListener] pronto");
});

//da richiamare quando si vuole fare la richiesta di inizio partita
function connect(port, ip){
   // PeerHandlerListener.close();
    HOST = net.createConnection(port, ip);
    HOST.on("connect", () =>{
        HOST.write("Hello");

    })
}



