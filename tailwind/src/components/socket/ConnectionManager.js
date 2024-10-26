import React from 'react';
import { socket } from './socket';

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button onClick={ connect } style={{padding:"4px",marginRight:'4px', backgroundColor:'red'}}>Connect</button>
      <button onClick={ disconnect } style={{padding:"4px",marginLeft:'4px', backgroundColor:'green'}}>Disconnect</button>
    </>
  );
}