import AddChatIcon from "@mui/icons-material/AddComment";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatNameCard from "../Components/ChatNameCard";
import chatData from "../Mocks/ChatMock.json";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import Cookies from "js-cookie";
import axios from "axios";
import jwt_decode from "jwt-decode";

function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [accName, setAccName] = useState("");
  const [selectedChatName, setSelectedChatName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = Cookies.get("jwt") !== undefined;
  const initials = getInitials(selectedChatName);

  useEffect(() => {
    if (isLoggedIn) {
      const token = Cookies.get("jwt");
      const decodedToken = jwt_decode(token);
      setAccName(decodedToken.name);
    }
  }, [isLoggedIn]);

  const handleCardSelect = (chatId, chatName) => {
    setSelectedChatId(chatId);
    setSelectedChatName(chatName);
  };

  function getInitials(Name) {
    return Name.charAt(0).toUpperCase();
  }

  const handleSendClick = () => {
    if (inputValue !== "" && inputValue.trim() !== "") {
      const selectedChat = chatData.find(
        (chat) =>
          (chat.user1_id === accName && chat.user2_id === selectedChatName) ||
          (chat.user1_id === selectedChatName && chat.user2_id === accName)
      );

      if (selectedChat) {
        const newMessage = {
          message_id: `msg00${selectedChat.messages.length + 1}`,
          sender_id: accName,
          receiver_id: selectedChatName,
          message_date: new Date().toISOString().split("T")[0],
          message_time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          message_text: inputValue,
        };

        selectedChat.messages.push(newMessage);

        axios
          .post("http://localhost:8080/api/saveChat", chatData)
          .then((response) => {
            console.log(response.data.message);
            setInputValue("");
          })
          .catch((error) => {
            console.error("Error saving chat:", error);
          });
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendClick();
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleLogout = () => {
    Cookies.remove("jwt");
    navigate("/");
  };

  const handleLoginButton = () => {
    navigate("/SignIn");
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gunmetal text-white">
        <p>Please sign in before accessing the chat page.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 rounded"
          onClick={handleLoginButton}
        >
          Sign In
        </button>
      </div>
    );
  }

  const filteredChats = chatData.filter(
    (chat) => chat.user1_id === accName || chat.user2_id === accName
  );

  return (
    <div className="w-screen h-screen bg-gunmetal flex">
      <div className="w-1/5 h-screen border-r">
        <div className="text-white flex justify-between items-center px-8 h-14">
          <p className="font-mont-b">Chats</p>
          <Link to="/TherapistList">
            <AddChatIcon className="cursor-pointer" />
          </Link>
        </div>
        <div className="h-4/5 px-4 overflow-y-scroll">
          {filteredChats.map((chat) => {
            const currentUser =
              accName === chat.user1_id ? chat.user2_id : chat.user1_id;
            const lastMessage =
              chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1].message_text
                : "";
            return (
              <ChatNameCard
                key={chat.chat_id}
                name={currentUser}
                lastMessage={lastMessage}
                isSelected={selectedChatName === currentUser}
                onSelect={() => handleCardSelect(chat.chat_id, currentUser)}
              />
            );
          })}
        </div>
        <div className="text-white h-20 flex justify-between items-center px-8">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-400 text-lg font-lato">
              {getInitials(accName)}
            </div>
            <p className="ml-3 font-mont-b">{accName}</p>
          </div>
          <div>
            <LogoutIcon
              className="cursor-pointer"
              onClick={() => handleLogout()}
            />
          </div>
        </div>
      </div>
      {selectedChatId !== null && (
        <div className="w-4/5">
          <div className="text-white h-16 px-8 shadow-md flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-400 text-lg font-lato">
                {initials}
              </div>
              <div className="font-mont-b">{selectedChatName}</div>
            </div>
          </div>
          <div className="h-4/5 overflow-y-scroll px-24 flex flex-col">
            {chatData
              .find(
                (chat) =>
                  (chat.user1_id === accName &&
                    chat.user2_id === selectedChatName) ||
                  (chat.user1_id === selectedChatName &&
                    chat.user2_id === accName)
              )
              .messages.map((message, index) => {
                if (message.sender_id === accName) {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-end max-w-50% self-end"
                    >
                      <p className="bg-blue-600 px-2 py-1 rounded-l-lg rounded-tr-lg text-white my-2 min-w-min">
                        {message.message_text}
                      </p>
                      <span className="text-xs text-gray-500 self-end mr-2">
                        {message.message_date} {message.message_time}
                      </span>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-start max-w-50%"
                    >
                      <p className="bg-gray-300 px-2 py-1 rounded-r-lg rounded-tl-lg my-2 min-w-min">
                        {message.message_text}
                      </p>
                      <span className="text-xs text-gray-500 self-start ml-2">
                        {message.message_date} {message.message_time}
                      </span>
                    </div>
                  );
                }
              })}
          </div>
          <div className="flex justify-center items-center gap-2 mt-2">
            <input
              type="text"
              className="bg-transparent outline-none border-2 border-blue-600 h-11 w-3/4 rounded-lg pl-3 text-white"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <div
              className="h-11 w-11 rounded-lg bg-blue-600 text-white flex justify-center items-center cursor-pointer"
              onClick={handleSendClick}
            >
              <SendIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
