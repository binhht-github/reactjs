import React, { useState } from 'react';
// import { socket } from './socket';

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

  //   socket.timeout(5000).emit('create-something', value, () => {
  //     setIsLoading(false);
  //   });
  }

  return (
    <form onSubmit={ onSubmit }>
      <input onChange={ e => setValue(e.target.value) } style={{backgroundColor:'red'}}/>

      <button type="submit" disabled={ isLoading } style={{backgroundColor:'green'}}>Submit</button>
    </form>
  );
}


// import React from 'react';
// import * as io from "socket.io-client";

// function MyForm() {
//   const socket = io('http://localhost:8080/mynamespace', { transports : ['websocket'] })
//   console.log("connected ", socket.connected);
//     socket.on('hello', (arg) => {
//         console.log('connected', arg)
//     })

//     socket.on('disconnect', () => {
//         console.log('disconnect', socket.id) // undefined
//     })

//     const submit = () => {
//       if(socket.connected){
//         console.log("cooo");
//       }
//         // const txt = document.getElementById('input').value
//         socket.emit('message',"aaaaaa")
//         console.log("CLick");
//     }
//   return (
//     <div>
//       <input id="input" type="text"/>
//       <button onClick={submit}>Submit</button>
//     </div>
//   );
// }

// export default MyForm;
