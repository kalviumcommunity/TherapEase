import TherapistCard from "../Components/TherapistCard";
import TherapistDetailsMock from "../Mocks/TherapistDetailsMock.json";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
function TherapistListingPage() {
    return (
        <div className="bg-slate-900 text-center min-h-screen max-h-fit flex flex-col items-center py-16">
          <div className="absolute top-16 left-10 ml-8 text-white cursor-pointer">
            <Link to="/Chat">
            <ArrowBackIcon/>
            </Link>
          </div>
          <div>
            <p className="font-mont-b text-3xl leading-tight text-white mb-14">
              Our Therapists
            </p>
            <div className="flex justify-evenly flex-wrap gap-10">
              {TherapistDetailsMock.map((therapist) => (
                <TherapistCard
                  key={therapist.name}
                  name={therapist.name}
                  pictureUrl={therapist.pictureUrl}
                  jobTitle={therapist.jobTitle}
                  specialties={therapist.specialties}
                  languages={therapist.languages}
                  isLoggedIn={true}
                />
              ))}
            </div>
          </div>
        </div>
      );
      
      
}

export default TherapistListingPage;