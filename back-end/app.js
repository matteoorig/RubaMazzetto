var nomeUtenteF = null;
var nomeAvversario = null;

var host_client = ""; //HOST = chi manda la richiesta    //CLIENT = chi accetta la richiesta     //CHI PERDE LANCIO DADI DIVENTA HOST PARTITA
//situazione dadi
var dadoUtente = null;
var dadoAvversario = null;
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

      var arrayCom = data.split(";");
      if (arrayCom[0] == "con") {
        nomeAvversario = arrayCom[1];
      }

      if (arrayCom[0] == "dad") {
        if (host_client == "HOST") { // controllo se sono HOST
          if (dadoUtente == arrayCom[1]) {
            //non so se il confronto è perfetto //se sono uguali
            this.client.write("dad;retry;");
            //ricaricare la pagina game per rifare il lancio dei dadi
            refreshPage();
          } else if (dadoUtente < arrayCom[1]) {
            //se io perdo
            host_client = "HOST";
            this.client.write("dad;client;");
            //devo distribuire le carte
            console.log("IO HO PERSO E FACCIO LE CARTE")
            shuffleCards();
            
          } else if (dadoUtente > arrayCom[1]) {
            //se io vinco
            host_client = "CLIENT";
            this.client.write("dad;host;");
          }
        }else if(host_client == "CLIENT"){ //se sono CLIENT
          if(arrayCom[1] == "retry"){
            //ricaricare la pagina game per rifare il lancio dei dadi
            refreshPage();
          }else if(arrayCom[1] == "client"){
            //io ho vinto quindi rimango client e aspetto che mi invii le carte l'HOST
            host_client = "CLIENT";
          }else if(arrayCom[1] == "host"){
            //io ho perso quindi divento HOST
            host_client = "HOST";
            //devo distribuire le carte
            console.log("IO HO PERSO E FACCIO LE CARTE")
            shuffleCards();
            
          }
        }
      }

    });
  }

  close() {
    this.client.destroy();
  }

  scrivi(data) {
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
      if (this.cont == 0) {
        //la prima la accetto tutte le altre le rifiuto
        this.connection = socket;
        this.cont = 1;
      } else {
        socket.end();
      }

      this.connection.on("data", (data) => {
        console.log(data.toString());
        var dataS = data.toString();

        var arrayCom = dataS.split(";");
        if (arrayCom[0] == "con") {
          //un nuovo utente vuile connettersi con il suo indirizzo ip
          alertNewConnection(arrayCom[1]);

          nomeAvversario = arrayCom[1];
        }


        if (arrayCom[0] == "dad") {
          if (host_client == "HOST") { // controllo se sono HOST
            if (dadoUtente == arrayCom[1]) {
              //non so se il confronto è perfetto //se sono uguali
              this.connection.write("dad;retry;");
              //ricaricare la pagina game per rifare il lancio dei dadi
              refreshPage();
            } else if (dadoUtente < arrayCom[1]) {
              //se io perdo
              host_client = "HOST";
              this.connection.write("dad;client;");
              //devo distribuire le carte
              shuffleCards();
            } else if (dadoUtente > arrayCom[1]) {
              //se io vinco
              host_client = "CLIENT";
              this.connection.write("dad;host;");
            }
          }else if(host_client == "CLIENT"){ //se sono CLIENT
            if(arrayCom[1] == "retry"){
              //ricaricare la pagina game per rifare il lancio dei dadi
              refreshPage();
            }else if(arrayCom[1] == "client"){
              //io ho vinto quindi rimango client e aspetto che mi invii le carte l'HOST
              host_client = "CLIENT";
            }else if(arrayCom[1] == "host"){
              //io ho perso quindi divento HOST
              host_client = "HOST";
              //devo distribuire le carte
              shuffleCards();
              console.log("Faccio le carte");
            }
          }
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

  scrivi(data) {
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
  res.sendFile(path.join(__dirname, "../front-end/index.html"));
});
app.get("/styleIndex.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/styleIndex.css"));
});
app.get("/functionIndex.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/functionIndex.js"));
});
app.get("/titolo.png", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/titolo.png"));
});

app.get("/second", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/nickname.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/gioco.html"));
});
app.get("/styleGioco.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/styleGioco.css"));
});
app.get("/functionGioco.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/functionGioco.js"));
});
app.get("/dadi/dado1.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/dadi/dado1.svg"));
});
app.get("/dadi/dado2.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/dadi/dado2.svg"));
});
app.get("/dadi/dado3.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/dadi/dado3.svg"));
});
app.get("/dadi/dado4.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/dadi/dado4.svg"));
});
app.get("/dadi/dado5.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/dadi/dado5.svg"));
});
app.get("/dadi/dado6.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/dadi/dado6.svg"));
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
      //pagina dove ho gia accettato la connessione e gli devo dire il mio nickname e quello dell'avversario
      const payLoad = {
        "method": "addData",
        "nomeUtente": nomeUtenteF,
        "nomeAvversario": nomeAvversario,
      }
      connessioneInCorso.send(JSON.stringify(payLoad));

    }
    if (result.method == "game") {
      //pagina del gioco tengo la connessione accettata
    }

    if (result.method == "newGame") {
      //setto il mio nome utente
      nomeUtenteF = result.nomeutente;
      //prima chiudo sempre l'ascolto
      avversario.close();
      //evento creo connessione con già nomeutente ad un determinato indirizzo ip
      avversario = new Client(result.indirizzoIp);
      avversario.start();
      avversario.scrivi("con;" + result.nomeutente + ";"); //con;nickname;
      //se mando richiesta sono HOST
      host_client = "HOST";
    }
    if (result.method == "denyNewUser") {
      avversario.close();
    }
    if (result.method == "sendNickNewGame") {
      nomeUtenteF = result.nomeutente;
      avversario.scrivi("con;" + result.nomeutente + ";"); //con;nickname;
      host_client = "CLIENT";
    }

    if (result.method == "rollDice") {
      //setto il valore del dado per i successivi confronti
      dadoUtente = result.dad;
      if (host_client == "CLIENT") {
        avversario.scrivi("dad;" + result.dad + ";");
      }
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

function alertNewConnection(nickname) {
  const payLoad = {
    method: "alert",
    nickname: nickname,
  };
  connessioneInCorso.send(JSON.stringify(payLoad));
}

function refreshPage(){
  const payLoad = {
    method: "refresh",
  };
  connessioneInCorso.send(JSON.stringify(payLoad));
}


function shuffleCards(){

}