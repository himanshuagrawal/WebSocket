window.addEventListener('load',function(){
    let socket = io.connect('http://localhost:4000',{'name':'Himmy'});
    let btn = document.querySelector('#send');
    let handle = document.querySelector('#handle');
    let message = document.querySelector('#message');
    let output = document.querySelector('#output');
    let feedback = document.querySelector('#feedback');

    btn.addEventListener('click',function(){
        socket.emit('chat',{
            handle:handle.value,
            message:message.value
        });
        message.value="";
    });

    message.addEventListener('keyup',function(){
        socket.emit('typing',handle.value);
    })

    socket.on('chatfromserver',function(data){
        output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
        feedback.removeChild(feedback.querySelector(`#${data.handle}`));
    });

    socket.on('typefromserver',function(data){
        console.log(feedback.querySelector(`#${data}`));
        if(feedback.querySelector(`#${data}`)===null){
            feedback.innerHTML+=`<p id=${data}><em>` + data + ' is typing  a message .....' + '</em></p>';
        }
        
    })
})
    
