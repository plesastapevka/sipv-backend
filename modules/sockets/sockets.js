// const Net = require('net');
const Socket = require('./TCPSocket')
var port = 4000;
// const server = new Net.Server();

var active = []

const postChannel = (req) => {
    for(c in active) {
        if(c.name == req.channel) return c.port;
    }
    return createChannel(req);
}

const createChannel = (req) => {
    const name = req.channel;
    var server = new Socket("test", function(socket) {
        server.addClient(socket);

        /// User sends msg
        socket.on('data', function (data) {
            //TODO: protocol parser
            var message = 'user: ' + data.toString();
            // server.broadcast('user', message);
            // console.log(message);
        });

        /// User disconnects
        socket.on('end', function () {
            server.removeClient(socket);
            if(server.clients.length == 0) {
                server.close();
            }
        });

        // On socket error
        socket.on('error', function (error) {
            console.log('Socket error: ', error.message);
        });
    });

    server.listen(port, function() {
        console.log("New channel on port: " + port);
        port++;
    });

    active.push({name: req.name, server: server, port: port});

    return port;
}

module.exports = {
    postChannel
}