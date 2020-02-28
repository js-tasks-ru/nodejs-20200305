import React, { Component } from 'react';
import socketio from 'socket.io-client';

export default class Chat extends Component {
  componentDidMount() {
    this.client = socketio({
      transportOptions: {
        polling: {
          extraHeaders: {
            'x-clientid': 'abc'
          }
        }
      }
    });
  
    this.client.on('connect', () => console.log('connect'));
    this.client.on('connect_error', () => console.log('connect_error'));
    this.client.on('error', () => console.log('error'));
    this.client.on('reconnect', () => console.log('reconnect'));
  
    this.client.on('message', msg => console.log(msg));
  }
  
  render() {
    return (
      <div>
        <h1>hi from chat component</h1>
        <button onClick={this.sendMessage.bind(this)}>send event</button>
      </div>
    );
  }
  
  sendMessage() {
    this.client.emit('message', 'hello world!');
  }
}
