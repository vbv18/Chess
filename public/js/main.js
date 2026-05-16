const socket = io();

socket.emit("hello");
socket.on("hello world", () => {
    console.log("hello world recieved");
})