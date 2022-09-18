from flask import Flask, render_template
from flask_socketio import SocketIO, leave_room, join_room, send, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = "hackthenorth.slay"
socketio = SocketIO(app)

@app.route("/")
def home():
    return render_template("index.html")

@socketio.on("connect")
def connect():
    join_room("theroom")
    print("Connected!")

@socketio.on("sendMessage")
def sendMessage(data):
    print("received" + data["message"])
    emit("receiveMessage", {"message": data["message"], "user": data["user"]}, to="theroom")

# @socketio.on("changeRoom")
# def changeRoom(data):
#     join_room(data["name"])

if __name__ == "__main__":
    socketio.run(app, debug = True)