chatMessage.onfocus = function(){
    if(chatMessage.value="Type here..."){
        chatMessage.value = "";
    }
}

chatMessage.onkeydown = function(e){
    if(e.key=="Enter"){
        gameClient.cmd_message(chatMessage.value);
        chatMessage.value = "";
    }
}