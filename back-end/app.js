var Net = require("net");
const express = require("express");

class Client {
  constructor() {
    this.client = new Net.Socket();
    this.client.setEncoding("utf-8");
  }

  start() {
    this.client.connect(2002, "localhost");
    this.client.on("connect", () => {
      console.log("client connesso");
      this.client.write("[CLIENT] Hellooooo");
    });
    this.client.on("data", (data) => {
      console.log("Dati dal server: " + data);
    });
  }

  close() {
    this.client.destroy();
  }
}

class Listener {
  constructor() {
    this.situazione = 0; // 0=>sta andando 1=>non va
    Net.createServer();
    this.server = new Net.Server();
  }

  start() {
    this.server.listen(2003, () => {
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







var avversario = null;

var stato = 0;
var connessioneInCorso = null;
//apro l'applicazione su due pagine
console.log("[APP] pronto");
const app = express();
const pagina = require("http").Server(app);
const path = require("path");
const http = require("http");

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/second", (req, res) => {
  res.sendFile(path.join(__dirname, "secondIndex.html"));
});
pagina.listen(8889);

//ascolto la comunicazione tra pagina html e server
const webSocketServer = require("websocket").server;
const httpServer = http.createServer();
httpServer.listen(8888);
const wsServer = new webSocketServer({
  httpServer: httpServer,
});

wsServer.on("request", (request) => {
  const connection = request.accept(null, request.origin);
  connessioneInCorso = connection;
  const payLoad = {
    method: "Server",
  };
  connection.send(JSON.stringify(payLoad));
  connection.on("message", (message) => {
    //quando arriva un dato dal html viene elaborato qui
    const result = JSON.parse(message.utf8Data);

    if (result.method == "index") {
      //pagina dove ascolto e posso inviare
    }
    if (result.method == "invio") {
      //pagina dove ho gia accettato la connessione e gli devo dire il mio nickname
      avversario.close();
      avversario = new Client();
      avversario.start();
    }
    if (result.method == "game") {
      //pagina del gioco tengo la connessione accettata
    }
    console.log(result.method);
  });
});

//io ascolto sempre
avversario = new Listener();
avversario.start();

//event() => pagina con <nomeutente>
//stato attuale = 0
//se mentre ascolto mi arriva una richiesta la accetto (non dovrei più poter accettare altre richieste)
//stato attuale = 1

//event() => pagina con <nomeutente><indirizzoIp>
//se invece voglio fare io una richiesta -- posso farla solo se stato = 0
//stato attuale = 1
