const express= require('express');
const socket = require('socket.io');
const app = express();

const server = app.listen(4000,function(){
    console.log("Connection made Successfully");
});
 
app.use('/js',express.static(__dirname+'\\JS'));
app.use('/css',express.static(__dirname+'\\CSS'));

app.get('/home',function(req,res){
    res.sendFile(__dirname+'/HTML/Test.html');
})

const io = socket(server);

io.on('connection',function(sockett){
    sockett.on('chat',function(data){
        io.sockets.emit('chatfromserver',data);
    });
    sockett.on('typing',function(data){
        sockett.broadcast.emit('typefromserver',data);
    })
    
})

