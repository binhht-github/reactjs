import React, { useEffect, useState } from "react";
import "./Message.css";
import { useSocket } from "./useSocket";
import { useFetch } from "./useFetch";
import { MessageList } from "./MessageList";

export const Message = ({ room, username }) => {
  const { isConnected, socketResponse, sendData } = useSocket(room, username);
  const [messageInput, setMessageInput] = useState("");
  const [messageList, setMessageList] = useState([]);

  const { responseData, error, loading } = useFetch("/message/" + room);

  const addMessageToList = (val) => {
    if (val.room == "") return;
    setMessageList([...messageList, val]);
  };

  useEffect(() => {
    if (responseData != undefined) {
      setMessageList([...responseData, ...messageList]);
    }
  }, [responseData]);

  useEffect(() => {
    console.log("Socket Response: ", socketResponse);
    addMessageToList(socketResponse);
  }, [socketResponse]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("sent ",messageInput);
    if (messageInput != "") {
      sendData({
        content: messageInput,
      });
      const time = ""; //timeStampConverter(Math.floor(Date.now() / 1000));
      addMessageToList({
        content: messageInput,
        username: username,
        createdDateTime: new Date(),
        messageType: "CLIENT",
      });
      setMessageInput("");
    }
  };

  return (
    <div className="message_root_div">
      <span className="room_name">Room: {room} </span>
      <span className="user_name">Welcome: {username} </span>
      <div className="message_component">
        <MessageList username={username} messageList={messageList} />
        <form className="chat-input" onSubmit={(e) => sendMessage(e)}>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit">
            submit
            {/* {messageInput == "" ? (
              <RiSendPlaneLine size={25} />
            ) : (
              <RiSendPlaneFill color="#2671ff" size={25} />
            )} */}
          </button>
        </form>
      </div>
    </div>
  );
};