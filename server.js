
  const express = require('express'),
  http = require('http'),
  app = express(),
  server = http.createServer(app),
  io = require('socket.io').listen(server);

    //------------------------------ Web app client ------------------------------//
    const path = require('path')
    const socketio = require('socket.io')
    //const io = socketio(server)
    const publicDirectoryPath = path.join(__dirname, './public')
    app.use(express.static(publicDirectoryPath))
    var getDevice = "";
     
  //------------------------------ Web app client ------------------------------//

  // ----------------------------Android App client -------------------------------//
  app.get('/', (req, res) => {
  res.send('Chat Server is running on port 9099')
  });

   io.on('connection', (socket) => {
   console.log('user connected')
        socket.on('join', function(DeviceName) {
        console.log(DeviceName +" : has joined  "  );
        socket.broadcast.emit('Device ',DeviceName +" : has Connected ");
    });

       socket.on('messagedetection', (device,DeviceDetail) => {
       //log the message in console 
       console.log(device+" :" +DeviceDetail)
        getDevice = DeviceDetail ;
        //create a message object 
       let  message = {"message":DeviceDetail, "Device Name":device}
      // send the message to the client side  
       io.emit('message', message );
       });
      
    socket.on('disconnect', function() {
    console.log( ' user has left ')
    socket.broadcast.emit("userdisconnect"," user has left ") 

});
});
       //-------------------------------------Android App client------------------------------------//

         // ----------------------------------- Web App Client ---------------------------------//
   io.on('connection', socket => {
    socket.broadcast.emit("showMessage", { name: 'Anonymous', message: 'A NEW USER HAS JOINED' })
    socket.on('sendMessage', message => io.emit('showMessage', getDevice, (console.log(getDevice))) 
    
    )
  })

    // ---------------------------------------Web App Client ---------------------------------//

server.listen(9099,()=>{
console.log('Node app is running on port 9099');

});