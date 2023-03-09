import io from 'socket.io-client';

class Socket {
  constructor(url) {
    this.socket = io(url);
    this.listeners = {};
  }

  on(eventName, callback) {
    this.listeners[eventName] = callback;
    this.socket.on(eventName, data => {
      if (this.listeners[eventName]) {
        this.listeners[eventName](data);
      }
    });
  }
  join(roomName) {
    this.socket.emit('join-room', roomName);
  }

  leave(roomName) {
    this.socket.emit('leave-room', roomName);
  }

  off(eventName) {
    delete this.listeners[eventName];
    this.socket.off(eventName);
  }

  emit(eventName, data) {
    this.socket.emit(eventName, data);
  }

  close() {
    this.socket.close();
  }
}

export default Socket;
