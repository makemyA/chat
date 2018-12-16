const express=require('express');
const app=express();
const server=require('http').createServer(app);
const io= require('socket.io').listen(server);
const path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/public/views'));
app.use(express.static('public'));
app.get('/', (req, res)=> {
    const tableau= ['a','b','c','d'];
    res.render('index.pug',{tab:tableau});
});
let users= [];
io.on('connection', (socket,pseudo)=>{
    console.log("Un utilisateur vient de se connecter");
    socket.on('message', (data)=>{
        console.log(data.message);
        io.sockets.emit('messageToAll',{message:data.message, pseudo: data.pseudo });
    });
    socket.on('pseudo',(data)=>{       
        if(!users.includes(data)){
            users.push(data);
            socket.broadcast.emit('newUser',data); // afin de stream tous les utilisateurs en même temps  sauf celui qui vient de se connecter
            io.sockets.emit("nbreUser", users.length); //Afin de stream tous les utilisateurs en même temps
            socket.emit('name', data);
            console.log("Bienvenue à "+ data);
            console.log(users);
        }else{
            socket.emit('userExists', "Ce nom est déjà pris");
        }
        socket.on('disconnect', (socket)=>{
            console.log(data+" vient de se déconnecter");
            users.splice(data.indexOf(),1);
            console.log(users);
    });
    });
});
server.listen(5000);
console.log("bienvenue");