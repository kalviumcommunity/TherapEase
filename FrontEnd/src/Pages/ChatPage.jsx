import AddChatIcon from "@mui/icons-material/AddComment";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatNameCard from "../Components/ChatNameCard";
import ChatMock from "../Mocks/ChatMock.json";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";
import SendIcon from "@mui/icons-material/Send";

function ChatPage() {
  const accName = "Zaid";
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [selectedChatName, setSelectedChatName] = useState("");
  const [inputValue, setInputValue] = useState("");

  const initials = getInitials(selectedChatName);

  const handleCardSelect = (index) => {
    setSelectedCardIndex(index);
    const selectedChat = ChatMock[index];
    const currentUser =
      accName === selectedChat.user1_id
        ? selectedChat.user2_id
        : selectedChat.user1_id;
    setSelectedChatName(currentUser);
  };
  function getInitials(Name) {
    return Name.charAt(0).toUpperCase();
  }
  const handleSendClick = () => {
    console.log(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendClick();
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
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
          {ChatMock.map((chat, index) => {
            const currentUser =
              accName === chat.user1_id ? chat.user2_id : chat.user1_id;
            const lastMessage =
              chat.messages[chat.messages.length - 1]?.message_text;
            return (
              <ChatNameCard
                key={chat.chat_id}
                name={currentUser}
                lastMessage={lastMessage}
                isSelected={selectedCardIndex === index}
                onSelect={() => handleCardSelect(index)}
              />
            );
          })}
        </div>
        <div className="text-white h-20 flex justify-between items-center px-8">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-400 text-lg font-lato">
              Z
            </div>
            <p className="ml-3 font-mont-b">Zaid</p>
          </div>
          <div>
            <Link to="/">
              <LogoutIcon className="cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
      {selectedChatName !== "" && (
        <div className="w-4/5">
          <div className="text-white h-16 px-8 shadow-md flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-400 text-lg font-lato">
                {initials}
              </div>
              <div className="font-mont-b">{selectedChatName}</div>
            </div>
            <div>
              <Switch className="cursor-pointer" />
              <DeleteIcon className="cursor-pointer" />
            </div>
          </div>

          <div className="h-4/5 overflow-y-scroll px-24 flex flex-col">
            {ChatMock[selectedCardIndex].messages.map((message, index) => {
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
                    <p className="bg-gray-300 px-2 py-1 rounded-r-lg rounded-tl-lg mb-2 min-w-min">
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
