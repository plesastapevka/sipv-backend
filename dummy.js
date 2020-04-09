const Net=require('net');
var client=new Net.Socket();
client.connect(4000, '127.0.0.1',function() {
	client.write('hello');
});
client.on('data', function(data) {
	console.log(data.toString()); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});
