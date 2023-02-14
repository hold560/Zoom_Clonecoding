import http from "http";
//import WebSocket from "ws";
import SocketIO from "socket.io";
import express from "express";
//browser auto-reload
import livereloadMiddleware from "connect-livereload";
import livereload from "livereload";

const liveServer = livereload.createServer({
exts: ["js", "pug", "css"],
delay: 1000,
});

liveServer.watch(__dirname);

const app = express();
app.use(livereloadMiddleware());


// view engine setup
app.set("view engine", "pug"); // view engine set with Pug
app.set("views", __dirname + "/views") // express로 template 지정 
app.use("/public", express.static(__dirname + "/public")); // /public으로 갈 시 유저가 해당 파일을 볼 수 있게끔 설정

app.get("/", (req, res)=>res.render("home")); // home.pug를 render해주는 route handler 
app.get("/*", (req, res)=>res.redirect("/")); 


const handleListen = () => console.log(`listening on http://localhost:3000`);

const httpServer = http.createServer(app); //http server
const wsServer = SocketIO(httpServer); //socket io로 server 생성 
//합치므로써 같은 port에서 http와 ws 의 request를 모두 처리할 수 있다

wsServer.on("connection", (socket) => {
    socket.on("enter_room", (msg, done) => {
        console.log(msg);
        setTimeout(()=>{
            done();
        }, 10000);
    }); //front-end의 이벤트를 back-end로 불러오기, 
    //front-end의 on과 back-end의 emit은 같은 이름이어야 한다
});


//wss로 back-end의 socket을 connection함으로써  front-end와 real-time 소통을 가능케함 
/* const wss = new WebSocket.Server({server}); // ws server를 http server 위에 만들기
const sockets = [];

    wss.on("connection", (socket) => {
    sockets.push(socket); //브라우저들이 sockets에 들어갈 수 있도록 넣어줌
    socket["nickname"] = "Anon";
    console.log("Connected to Browser");
    socket.on("close", ()=> {console.log("Disconnected from the browser😑");}); //browser 닫으면..
    socket.on("message", (msg) => { //browser가 server에 message 보내면.. //back-end -> front-end
        const message = JSON.parse(msg.toString("utf-8"));
        //console.log(parsed, message.toString("utf-8"));
        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
            break 
            case "nickname":
                socket["nickname"] = message.payload;
            break 
        };
    });
}); */

httpServer.listen(3000, handleListen);
