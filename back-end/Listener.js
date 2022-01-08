var Net = require("net");
var nomeAvversario = null;
var dadoUtente = 3;
host_client = "HOST";
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
          } else if (dadoUtente < arrayCom[1]) {
            //se io perdo
            host_client = "HOST";
            this.client.write("dad;client;");
            //devo distribuire le carte
            console.log("IO HO PERSO E FACCIO LE CARTE")
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
          }
        }
      }
    });
  }

  close() {
    this.client.destroy();
  }

  scrivi(data){
    this.client.write(data);
  }
}
var client = new Client("127.0.0.1");
client.start();
client.scrivi("con;"+"Luigi"+";"); 