import json
import queue
from flask import Blueprint, Response

stream_bp = Blueprint('stream', __name__)

class MessageAnnouncer:
    def __init__(self):
        self.listeners = []

    def listen(self):
        q = queue.Queue(maxsize=20)
        self.listeners.append(q)
        return q

    def announce(self, msg_data):
        formatted_msg = f"data: {json.dumps(msg_data)}\n\n"
        for i in reversed(range(len(self.listeners))):
            try:
                self.listeners[i].put_nowait(formatted_msg)
            except queue.Full:
                del self.listeners[i]

announcer = MessageAnnouncer()

@stream_bp.route('/api/stream', methods=['GET'])
def listen_events():
    def stream():
        messages = announcer.listen()
        while True:
            msg = messages.get()
            yield msg

    return Response(stream(), mimetype='text/event-stream')