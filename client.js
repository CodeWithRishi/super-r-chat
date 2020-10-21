const socket = io('http://localhost:3000');
const form = document.getElementById("send-container");
const messageInput = document.getElementById("input");
const messageContainer = document.querySelector(".container");



const appendmsg = (message,position) =>{
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

form.addEventListener('submit' ,(g) =>{
    g.preventDefault()
    const message = messageInput.value  
    appendmsg(`You:${message}`,'message-right')
    socket.emit('sendthechatmsg',message)
    swal("Succesfull..!!", "Message has been sent", "success");
    messageInput.value = " "
})


const name = prompt("Enter your name to join the chat")
swal("Joined", `You have joined the chat as ${name}` , "success");
socket.emit("new-user-joined" , name);

socket.on('user-joined' ,name=>{
    appendmsg(`${name} joined the chat` , 'message-center')
    swal("User Joined", `${name} has joined the chat` , "success");
})

socket.on('recieve' ,data =>{
    appendmsg(`${data.name} : ${data.message}` , 'message-left')
    swal("Message..", "You have a recieved a message", "info")
})

socket.on('left',message=>{
    appendmsg(`${name} has left the chat`,'message-center')
    swal("User Left", `${name} has left the chat` , 'error')
})