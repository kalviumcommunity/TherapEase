import { useState, useEffect } from "react";
import TherapistCard from "../Components/TherapistCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function TherapistListingPage() {
  const [therapists, setTherapists] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('jwt');
    setIsLoggedIn(!!token);
  }, []);
  

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/therapists")
      .then(response => {
        setTherapists(response.data);
      })
      .catch(error => {
        console.error("Error fetching therapists:", error);
      });
  }, []);

  return (
    <div className="bg-slate-900 text-center min-h-screen max-h-fit flex flex-col items-center py-16">
      <div className="absolute top-16 left-10 ml-8 text-white cursor-pointer">
        <Link to="/Chat">
          <ArrowBackIcon />
        </Link>
      </div>
      <div>
        <p className="font-mont-b text-3xl leading-tight text-white mb-14">
          Our Therapists
        </p>
        <div className="flex justify-evenly flex-wrap gap-10">
          {therapists.map(therapist => (
            <TherapistCard
              key={therapist.name}
              name={therapist.name}
              pictureUrl={therapist.pictureUrl}
              jobTitle={therapist.jobTitle}
              specialties={therapist.specialties}
              languages={therapist.languages}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TherapistListingPage;
