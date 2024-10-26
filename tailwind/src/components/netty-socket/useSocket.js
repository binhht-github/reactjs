import { useCallback, useEffect, useState } from "react";
import * as io from "socket.io-client";
import { SOCKET_BASE_URL } from "./apiConstants";

export const useSocket = (room, username,anh,hoten) => {
  const [socket, setSocket] = useState();
  const [socketResponse, setSocketResponse] = useState({
    room: "",
    content: "",
    username: "",
    activeType: "",
    createdDateTime: "",
  });
  const [isConnected, setConnected] = useState(false);
  // const sendData = useCallback(
  //   (payload) => {
  //     socket.emit("send_message", {
  //       room: room,
  //       content: payload.content,
  //       username: username,
  //       messageType: "CLIENT",
  //     });
  //     console.log("sent data");
  //   },
  //   [socket, room]
  // );
  const sendActiveWork = useCallback(
    (payload) => {
      socket.emit("send_message", {
        room: room,
        content: payload.content,
        nhanVien: {"maNhanVien":username,"anh":anh,"hoTen":hoten},
        activeType: "CLIENT",
      });
      console.log("sent data");
    },
    [socket, room]
  );
  useEffect(() => {
    const s = io(SOCKET_BASE_URL, {
      reconnection: false,
      query: `username=${username}&room=${room}`, //"room=" + room+",username="+username,
    });
    setSocket(s);
    s.on("connect", () => setConnected(true));
    s.on("read_message", (res) => {
      console.log("res ",res);
      setSocketResponse({
        room: res.room,
        content: res.content,
        hoTen: res.hoTen,
        activeType: res.activeType,
        createdDateTime: res.createdDateTime,
      });
    });
    return () => {
      s.disconnect();
    };
  }, [room]);

  return { socketResponse, isConnected,sendActiveWork };
};