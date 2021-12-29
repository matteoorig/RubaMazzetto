var Net = require("net");
const express = require("express");

class Client {
  constructor() {
    this.client = new Net.Socket();
    this.client.setEncoding("utf-8");
  }

  start() {
    this.client.connect(8889, "localhost");
    this.client.on("connect", () => {
      console.log("client connesso");
      this.client.write("[CLIENT] Hellooooo");
    });
    this.client.on("data", (data) => {
      console.log("Dati dal server: " + data);
    });
  }

  close(){
    this.client.destroy();
  }
}

class Listener {
  constructor() {
    Net.createServer();
    this.server = new Net.Server();
  }

  start() {
    this.server.listen(8889, () => {
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

  close(){
      this.server.close();
  }
}



//io ascolto sempre

//event() => pagina con <nomeutente>
//stato attuale = 0
//se mentre ascolto mi arriva una richiesta la accetto (non dovrei più poter accettare altre richieste)
//stato attuale = 1

//event() => pagina con <nomeutente><indirizzoIp>
//se invece voglio fare io una richiesta -- posso farla solo se stato = 0
//stato attuale = 1



console.log("[APP] pronto");
const app = express();