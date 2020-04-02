const Net=require('net');
const port=2222;
const server=new Net.Server();
server.listen(port,t());
server.on('connection', function(socket) {
    console.log("new connection");
	socket.write("hello");
	socket.on('data', function(chunk) {
		console.log('Message from client:' +chunk.toString());
	});
	socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});
function t(Tport)
{
	console.log('Tcp server listening on port: '+port);
}
function f(socket){
	
}

module.exports=server;