var socket = io.connect("http://127.0.0.1:5000");

function onLoad() {
    socket.onconnect(() => {
        socket.emit("connect");
    });

    sessionStorage.setItem("user", "arnav");
}

function sendMessage(data) {
    console.log(data);
    document.getElementById("message").value = "";
    socket.emit("sendMessage", {"message": data, "room": "theroom", "user": sessionStorage.getItem("user")});
}

socket.on("receiveMessage", (data) => {
    var messageLine = document.createElement("p");
    var messageText = document.createTextNode(data.user + ": " + data.message);
    messageLine.appendChild(messageText);
    document.getElementById("chatbox").appendChild(messageLine);
})