from flask_socketio import SocketIO, send

socketio = SocketIO()


@socketio.on('message')
def handle_message(data):
    print(f"Message: {data['data']} from {data['username']}")
    send(data, broadcast=True)

    # Define more SocketIO event handlers as needed
