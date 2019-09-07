const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);
app.get('/', (req, res) => {

res.send('Chat Server is running on port 9099')
});
io.on('connection', (socket) => {

console.log('user connected')

socket.on('join', function(DeviceName) {

        console.log(DeviceName +" : has joined  "  );

        socket.broadcast.emit('Device ',DeviceName +" : has Connected ");
    });


socket.on('messagedetection', (device,messageContent) => {
       
       //log the message in console 

       console.log(device+" :" +messageContent)
        //create a message object 
       let  message = {"message":messageContent, "Device Name":device}
          // send the message to the client side  
       io.emit('message', message );
     
      });
      
  
 socket.on('disconnect', function() {
    console.log( ' user has left ')
    socket.broadcast.emit("userdisconnect"," user has left ") 

});



});


server.listen(9099,()=>{

console.log('Node app is running on port 9099');

});