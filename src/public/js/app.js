
const socket = io(); //socket io로 back-end랑 front-end 연결

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
};

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, showRoom); //back-end는 2개의 argument를 받는다 
    roomName = input.value;
    input.value=""
};

form.addEventListener("submit", handleRoomSubmit);