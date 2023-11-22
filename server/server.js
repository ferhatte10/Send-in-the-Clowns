const express    = require('express');
const path       = require('path');
const Proxy      = require('http-proxy').createProxyServer();
const config     = require(path.join(__dirname,"../config/global.json"));
const port       = config.Server.settings.port;
const app        = express();

const ProxyServer= 'http://localhost:'+ config.Proxy.settings.port;


const io = require('socket.io')(config.Server.settings.socket);

io.on('connection',function(socket){

    socket.on('stream',function(data){
        socket.broadcast.emit('stream',data);
    });

    socket.conn.on("close", (reason) => {
        socket.broadcast.emit('streamoff',reason);
    });
});

app.all("/*", function(req, res) {
    Proxy.web(req, res, {target: ProxyServer});
});

app.listen(port, () => console.log(
`
    [+] Server         : http://localhost:${port}
    [+] Socket         : ws://localhost:${config.Server.settings.socket}
    [~] Running Server...
`
))