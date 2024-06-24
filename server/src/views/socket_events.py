from flask import request
from flask_socketio import SocketIO, send, emit

socketio = SocketIO()
online_users = list() 


@socketio.on('connect')
def handle_connect():
    print('Client connected')


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('set_online')
def set_online(username):
    print("setting user online")
    if username not in online_users:
        online_users.append(username)

    emit("updateOnlineUsers", online_users, broadcast=True)

@socketio.on('set_offline')
def set_offline(username):
    print("setting user offline")
    if username in online_users:
        online_users.remove(username)
    print(online_users)
    emit("updateOnlineUsers", online_users, broadcast=True)

    
@socketio.on('message')
def handle_message(data):
    print(f"Message: {data['data']} from {data['username']}")
    send(data, broadcast=True)

    # Define more SocketIO event handlers as needed
