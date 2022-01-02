var Net = require("net");

class Listener {
    constructor() {
      this.situazione = 0; // 0=>sta andando 1=>non va
      Net.createServer();
      this.server = new Net.Server();
    }
  
    start() {
      this.server.listen(2002, () => {
        console.log("In ascolto...");
      });
  
      this.server.on("connection", (socket) => {
        console.log("connessione effettuata");
  
        socket.on("data", (data) => {
          console.log(data.toString());
          socket.write("Suca");
        });
  
        socket.on("end", () => {
          console.log("connessione chiusa");
        });
      });
    }
  
    close() {
      this.server.close();
    }
}

var client = new Listener();
client.start();