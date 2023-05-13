import HomePage from "./Pages/HomePage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import ChatPage from "./Pages/ChatPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TherapistListingPage from "./Pages/TherapistListingPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/Chat" element={<ChatPage />} />
        <Route path="/TherapistList" element={<TherapistListingPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
