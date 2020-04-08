const Server = require('net');

class TCPSocket extends Server.Server {
    constructor(name, connectionListener) {
        super(connectionListener);

        this.clients = [];

        this.id = 0;
    }

    addClient(socket) {
        socket.id = this.id;
        this.clients.push({ id: socket.id, socket: socket });
        this.id++;
        let message = socket.id.toString() + ' has joined.';
        this.broadcast(null, message);
    }

    removeClient(socket) {
        var tmp = null;
        for (var a = 0; a < this.clients.length; a++) {
            if (socket.id === this.clients[a].socket.id) {
                tmp = a;
                break;
            }
        }
        this.clients.splice(tmp, 1);
        let message = socket.id.toString() + ' has left.';
        this.broadcast(null, socket.id + ' has left.');
    }

    broadcast(from, message) {
        if (this.clients.length === 0) {
            console.log('Everyone left the chat');
            return;
        }

        this.clients.forEach(function (e) {
            e.socket.write(message);
        });

    };
}

module.exports = TCPSocket;