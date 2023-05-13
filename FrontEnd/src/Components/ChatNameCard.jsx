import PropTypes from "prop-types";

function ChatNameCard({ name, lastMessage, isSelected, onSelect }) {
  const initials = getInitials(name);

  function getInitials(name) {
    return name.charAt(0).toUpperCase();
  }

  const message =
    lastMessage.length > 20 ? lastMessage.slice(0, 20) + "..." : lastMessage;

  const handleClick = () => {
    onSelect();
  };

  return (
    <div
      className={`text-white h-16 flex items-center gap-2 w-full bg-${
        isSelected ? "blue-600" : "arsenic"
      } rounded-2xl pl-5 cursor-pointer mb-4`}
      onClick={handleClick}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-400 text-lg font-lato">
        {initials}
      </div>
      <div>
        <div className="font-mont-b">{name}</div>
        <div className="font-lato text-xs text-gray-300">{message}</div>
      </div>
    </div>
  );
}

ChatNameCard.propTypes = {
  name: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ChatNameCard;
