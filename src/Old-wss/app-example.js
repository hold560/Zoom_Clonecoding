const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

//front-end의 socket은 backend로 메세지를 보낼 수 있게 해줌
const socket = new WebSocket(`ws://${window.location.host}`);

//back-end로 message를 받으면 다시 front-end로 msg를 JSON 형태로 보내줌
function makeMessage(type, payload){
    const msg={type, payload};
    return JSON.stringify(msg);
}
// connection 이 open됐을 때 
socket.addEventListener("open", ()=>{
    console.log("Connected to Server🙂");
});

// message 받을 때 마다 내용 출력 
socket.addEventListener("message", (message)=>{
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
    //console.log("New message:", message.data);
});

//server goes offline
socket.addEventListener("close", (message)=>{
    console.log("Disconnected from Server😑");
});

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value)); // front-end -> back-end
    const li = document.createElement("li");
    li.innerText = `You: ${input.value}`;
    messageList.append(li);
    //console.log("New message:", message.data);
    input.value = "";
};

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    // front-end -> back-end
    socket.send(makeMessage("nickname", input.value));  // sending string to back-end
    input.value = "";
};
messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);