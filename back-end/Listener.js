var Net = require("net");

class Client {
  constructor() {
    this.client = new Net.Socket();
    this.client.setEncoding("utf-8");
  }

  start() {
    this.client.connect(2003, "localhost");
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

var client = new Client();
client.start();