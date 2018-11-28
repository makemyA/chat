console.log('test');
const socket = io();
let name= document.getElementById("name");
let nbreUsers= document.getElementById("nbreUsers");
let newUser= document.getElementById("newUser");
console.log(name.innerHTML);
/* let chat= document.getElementById('container-chat'); */
let message = document.getElementById("message");
/* chat.addEventListener('submit',(e)=>{
    console.log("MErci pour l'envoi du formulaire");
    console.log(message);
    e.preventDefault();
   
}); */
let pseudo = document.getElementById("pseudo");
const setName=()=>{
    socket.emit('pseudo', pseudo.value);
    console.log("J'ai choisi le pseudo suivant:"+pseudo.value);
};
const sendMessage=()=>{
    socket.emit('message', message.value);
};

socket.on('messageFromServer', (data)=>{
    console.log(data);
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


/* name.innerHTML=pseudo; */
