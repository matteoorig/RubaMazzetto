var Net = require("net");

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
var client = new Client("127.0.0.1");
client.start();
client.scrivi("con;"+"MATTEO"+";"); 