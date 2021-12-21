var net = require('net');
var server = net.createServer();
server.listen(8899);

server.on('connection', (con) =>{

    con.on("data", (data) =>{
        console.log(data.toString());
    });
 
});