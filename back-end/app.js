var Net = require("net");
const express = require("express");

class Client {
  constructor(ipSecondPlayer) {
    this.ip = ipSecondPlayer;
    this.client = new Net.Socket();
    this.client.setEncoding("utf-8");
  }

  start() {
    this.client.connect(2003, this.ip);
    this.client.on("connect", () => {
      console.log("client connesso");
    });
    this.client.on("data", (data) => {
      console.log("Dati dal server: " + data);
    });
  }

  close() {
    this.client.destroy();
  }

  scrivi(data){
    this.client.write(data);
  }
}

class Listener {
  constructor() {
    this.situazione = 0; // 0=>sta andando 1=>non va
    this.connection = null;
    this.cont = 0;
    Net.createServer();
    this.server = new Net.Server();
    this.server.maxConnections = 1;
  }

  start() {
    this.server.listen(2003, () => {
      console.log("In ascolto...");
    });
    this.server.on("connection", (socket) => {
      if(this.cont == 0){ //la prima la accetto tutte le altre le rifiuto
        this.connection = socket;
        this.cont = 1;
      }else{
        socket.end();
      }

      this.connection.on("data", (data) => {
        console.log(data.toString());
        var dataS = data.toString();

        var arrayCom = dataS.split(";");
        if(arrayCom[0] == "con"){ //un nuovo utente vuile connettersi con il suo indirizzo ip
          alertNewConnection(arrayCom[1]);
        }
      });

      this.connection.on("end", () => {
        console.log("connessione chiusa");
      });
    });
  }

  close() {
    this.connection.end();
    //this.server.close();
  }

  scrivi(data){
    this.connection.write(data);
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

//svg per i dadi
app.get("/dad1.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "dad1.svg"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/second", (req, res) => {
  res.sendFile(path.join(__dirname, "secondIndex.html"));
});
app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "game.html"));
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
      
    }
    if (result.method == "game") {
      //pagina del gioco tengo la connessione accettata
    }

    if(result.method == "newGame"){
      //prima chiudo sempre l'ascolto
      avversario.close();
      //evento creo connessione con già nomeutente ad un determinato indirizzo ip
      avversario = new Client(result.indirizzoIp);
      avversario.start();
      avversario.scrivi("con;"+result.nomeutente+";"); //con;nickname;
    }
    if(result.method == "denyNewUser"){
      avversario.close();
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


function alertNewConnection(nickname){
  const payLoad = {
    method: "alert",
    "nickname": nickname,
  };
  connessioneInCorso.send(JSON.stringify(payLoad))
}