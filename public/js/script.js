console.log('test');
const socket = io();
let name= document.getElementById("name");
let nbreUsers= document.getElementById("nbreUsers");
let newUser= document.getElementById("newUser");
console.log(name.innerHTML);
const formPseudo = document.getElementById("form-pseudo");
const formMessage = document.getElementById("form-message");
let pseudo = document.getElementById("pseudo");
formPseudo.addEventListener('submit',(e)=>{
    e.preventDefault();
    socket.emit('pseudo', pseudo.value);
    pseudo.value="";
    console.log(pseudo.value);
});
let message = document.getElementById("message");
formMessage.addEventListener('submit',(e)=>{
    e.preventDefault();
    socket.emit('message',{message:message.value, pseudo:name.innerHTML});
    console.log("Message envoyé");
});
socket.on('newUser',(data)=>{
    newUser.innerHTML=data+' vient de se connecter';
})
socket.on('userExists',(data)=>{
    alert(data);
})
socket.on('name',(data)=>{
    name.innerHTML= data;
})
socket.on('nbreUser', (data)=>{
    console.log("le nombre de users est de :"+data);
    nbreUsers.innerHTML= "Il y a "+data+" users en ligne";
});
let boxMessage = document.getElementById('boxMessage');
socket.on('messageToAll', (data)=>{
    boxMessage.insertAdjacentHTML("afterbegin",
        "<p class='box box-pseudo'>"+data.pseudo+"</p><p class='box box-message'>"+data.message+'</p>');
});