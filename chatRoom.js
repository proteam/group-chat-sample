/////////////////////////////////
//  Import everything necessary

var express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


// Declare which port server is listening too
server.listen(3000);
console.log('Server started.');


////////////////////////
//  Declare all events

app.get('/' , application);
io.sockets.on('connection' , clientConnected);



//////////////////
// Event Handlers

function application(request , response){
    // Send the index.html file to the client
    response.sendFile(__dirname + '/public/index.html');
}

function clientConnected(socket){
    // Client disconnected
    socket.on('disconnect' , clientDisconnected);

    // Broadcast the message to all clients
    socket.on('send message' , sendMessage);
}

function clientDisconnected(){
    // Nothing for now
}

function sendMessage(message){
    io.sockets.emit('new message' , '<b>' + message.nickname + '</b>: ' + message.content);
}
