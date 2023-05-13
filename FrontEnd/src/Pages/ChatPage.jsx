import AddChatIcon from "@mui/icons-material/AddComment";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatNameCard from "../Components/ChatNameCard";
import ChatMock from "../Mocks/ChatMock.json";
import { useState } from "react";
import { Link } from "react-router-dom";

function ChatPage() {
  const accName = "Zaid";
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);

  const handleCardSelect = (index) => {
    setSelectedCardIndex(index);
  };

  return (
    <div className="w-screen h-screen bg-gunmetal">
      <div className="w-1/5 h-screen border-r relative">
        <div className="text-white h-14 flex justify-between items-center px-8">
          <p className="font-mont-b">Chats</p>
          <Link to="/TherapistList">
            <AddChatIcon className="cursor-pointer" />
          </Link>
        </div>
        <div className="flex-grow px-4">
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
        <div className="text-white absolute bottom-0 left-0 right-0 h-20 flex justify-between items-center px-8">
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
      <div></div>
    </div>
  );
}

export default ChatPage;
