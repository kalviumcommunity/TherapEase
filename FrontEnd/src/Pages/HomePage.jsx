import { useState, useEffect } from "react";
import tickmark from "../assets/tickmark.svg";
import banner from "../assets/bannerimg.png";
import TherapistCard from "../Components/TherapistCard";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function HomePage() {
  const [therapists, setTherapists] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    const token = Cookies.get('jwt');
    setIsLoggedIn(!!token);
  }, []);
  

  return (
    <div>
      <div>
        <div>
          <img
            src={banner}
            alt="banner"
            className="object-cover h-full w-full"
          />
        </div>
        <div className=" absolute top-0 left-0 w-full flex items-center justify-between px-10 py-5">
          <div className="flex items-center font-gaegu font-bold text-3xl">
            | TherapEase
          </div>
          <div className="flex items-center">
            <div>
              <Link to="/SignIn">
                <div className="text-sm font-medium mr-14">Sign In</div>
              </Link>
            </div>
            <div>
              <Link to="/SignUp">
                <div className="text-white px-5 py-3 rounded text-sm font-medium bg-zinc-900">
                  Sign Up
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-1/3 w-full flex justify-end">
          <div className=" w-2/5 mr-10">
            <div className="mb-6">
              <p className="font-mont-b text-5xl mb-4">
                A confidential space for your mental health needs.
              </p>
              <div className="font-lato">
                Access Expert Support and Counseling from the Comfort of Your
                Home
              </div>
            </div>
            <button
              className="text-white px-5 py-3 rounded text-sm font-medium bg-zinc-900"
              onClick={() =>
                window.scrollTo({
                  top: document.getElementById("our-therapists").offsetTop,
                  behavior: "smooth",
                })
              }
            >
              Find Your Therapist
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-around items-center my-20">
        <div className="w-1/3 flex flex-col items-end justify-around">
          <div className="font-mont-b text-5xl leading-tight">
            <span className="block">Transform Your</span>
            <span className="block">Life with</span>
            <span className="block">TherapEase</span>
          </div>
        </div>
        <div className="text-lg flex flex-col gap-10">
          <div className="flex items-center">
            <img src={tickmark} alt="Tickmark" className="mr-4 h-6 w-6" />
            <p className="text-lg font-semibold">{`TherapEase: Improving mental health and well-being.`}</p>
          </div>
          <div className="flex items-center">
            <img src={tickmark} alt="Tickmark" className="mr-4 h-6 w-6" />
            <p className="text-lg font-semibold">{`Confidential and professional mental health support, accessible from
            anywhere.`}</p>
          </div>
          <div className="flex items-center">
            <img src={tickmark} alt="Tickmark" className="mr-4 h-6 w-6" />
            <p className="text-lg font-semibold">{`Prioritizing privacy and anonymity for your comfort and security.`}</p>
          </div>
          <div className="flex items-center">
            <img src={tickmark} alt="Tickmark" className="mr-4 h-6 w-6" />
            <p className="text-lg font-semibold">{`Join our community for a happier and healthier life.`}</p>
          </div>
        </div>
      </div>
      <div className="py-16 bg-slate-900 text-center" id="our-therapists">
        <p className="font-mont-b text-3xl leading-tight text-white mb-14">
          Our Therapists
        </p>
        <div className="flex justify-evenly flex-wrap gap-10">
          {therapists.map((therapist) => (
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

export default HomePage;
