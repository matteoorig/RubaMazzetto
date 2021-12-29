var Net = require("net");

class Listener {

    constructor(stato){
        this.stato = stato;
        if(this.stato == 0){
            Net.createServer();
            this.server = new Net.Server();
        }
    }

    start(){
        if(this.stato == 0){
            this.server.listen(8889, () => {
                console.log("In ascolto...");
            });
    
            this.server.on("connection", (socket) => {
                console.log("connessione effettuata");
                
                socket.on("data", (data) => {
                  console.log(data.toString());
                  socket.write("Suca");
                });
              
                socket.on("end", ()=>{
                    console.log('connessione chiusa');
                })
              });
        }
    }

    changeStato(val){ 
        this.stato = val; 
    }
}

var stato = 0;
const listener = new Listener(stato);
listener.start();