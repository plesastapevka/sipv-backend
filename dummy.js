const Net=require('net');
var client=new Net.Socket();
client.connect(2222, '127.0.0.1',function(){
	console.log('Connected');
	client.write('hello');
});
client.on('data', function(data) {
	console.log('Received: ' + data); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});