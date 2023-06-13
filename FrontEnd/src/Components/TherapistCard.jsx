import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import chatMock from "../Mocks/ChatMock.json";

function TherapistCard({
  name,
  pictureUrl,
  jobTitle,
  specialties,
  languages,
  isLoggedIn,
}) {
  const navigate = useNavigate();

  const handleChatClick = () => {
    if (isLoggedIn) {
      const token = Cookies.get("jwt");
      const decodedToken = jwt_decode(token);
      const accName = decodedToken.name;
      const chat = {
        chat_id: `ch00${chatMock.length + 1}`,
        user1_id: accName,
        user2_id: name,
        is_chat_deleted: false,
        messages: [],
      };
      axios
        .post("http://localhost:8080/api/addChat", chat, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          navigate("/chat");
        })
        .catch((error) => {
          console.log(error);
          navigate("/chat");
        });
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 flex flex-col items-center w-84 h-118 overflow-hidden">
      <div className="rounded-full h-32 w-32 bg-gray-400 flex items-center justify-center mt-4 mb-4">
        <img
          src={pictureUrl}
          alt="Profile"
          className="h-full w-full object-cover rounded-full"
          style={{ height: "8rem", width: "8rem" }}
        />
      </div>
      <div className="flex-1">
        <p className="font-Mont-b text-white text-xl font-bold">{name}</p>
        <p className="text-white text-sm mb-4 font-lato">{jobTitle}</p>
        <div className="mb-4">
          <span className="text-gray-400 font-regular text-sm">
            Specialties
          </span>
          <p className="text-white text-base font-lato">
            {specialties && specialties.slice(0, 3).join(", ")}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-gray-400 font-regular text-sm">Languages</h3>
          <p className="text-white text-base font-lato">
            {languages && languages.slice(0, 3).join(", ")}
          </p>
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-Mont-b font-medium py-2 px-4 mt-2 rounded text-center"
          onClick={handleChatClick}
        >
          Chat Now
        </button>
      </div>
    </div>
  );
}

TherapistCard.propTypes = {
  name: PropTypes.string.isRequired,
  pictureUrl: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  specialties: PropTypes.array.isRequired,
  languages: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default TherapistCard;
