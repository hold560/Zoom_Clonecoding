
const socket = io(); //socket io로 back-end랑 front-end 연결

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");


function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", {payload:input.value}, ()=>{
        console.log("server is done!");
    }); 
    // 어떤 이름이든 emit할 수 있고, object를 string으로 변환시키지 전송 가능!
    input.value="";
}
form.addEventListener("submit", handleRoomSubmit);