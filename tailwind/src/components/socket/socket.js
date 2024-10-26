// import { io } from 'socket.io-client';
import * as io from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:8085';

export const socket = io(`${URL}/mynamespace`, {
  autoConnect: false
},  { transports: ['websocket', 'polling', 'flashsocket'] });
