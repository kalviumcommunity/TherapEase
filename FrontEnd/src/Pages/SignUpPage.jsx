import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  Cookies.remove("jwt");

  const handleSignUp = () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!name) {
      setNameError("Name cannot be empty");
    }
    if (!email) {
      setEmailError("Email cannot be empty");
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address");
    }
    if (!password) {
      setPasswordError("Password cannot be empty");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password cannot be empty");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    }

    if (name && email && password && confirmPassword) {
      axios
        .post("http://localhost:8080/api/signup", { name, email, password })
        .then(() => {
          navigate("/SignIn");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  return (
    <div className="w-full h-screen bg-slate-300">
      <div className="absolute top-6 left-10 font-gaegu font-bold text-3xl">
        <Link to="/">| TherapEase</Link>
      </div>
      <div className="flex justify-center items-center h-screen shadow-lg">
        <div className="w-3/12 h-4/6 rounded-tl-lg rounded-bl-lg text-white flex flex-col justify-center items-center bg-indigo-600 border-8 border-white">
          <div className="font-mont-b text-2xl mb-4">Welcome Back!</div>
          <div className="font-mont text-base font-semibold mb-8">
            Already have an account? Sign In
          </div>
          <div>
            <Link to="/SignIn">
              <button className="font-mont-b border border-white py-2 px-4 rounded transition duration-500 ease-in-out hover:bg-white hover:text-black">
                Sign In
              </button>
            </Link>
          </div>
        </div>
        <div className="w-3/12 h-4/6 rounded-tr-lg rounded-br-lg bg-white flex flex-col justify-center items-center">
          <div className="font-mont-b flex items-center justify-center mb-2 text-3xl">
            Create an account
          </div>
          <div className="pt-4">
            <div className="mb-2">
              <input
                className="font-lato appearance-none border border-gray-300 rounded py-3 px-3 w-72 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-black"
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="text-red-500 text-sm h-4">{nameError}</div>
            </div>
            <div className="mb-2">
              <input
                className="font-lato appearance-none border border-gray-300 rounded py-3 px-3 w-72 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-black"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-red-500 text-sm h-4">{emailError}</div>
            </div>
            <div className="mb-2">
              <input
                className="font-lato appearance-none border border-gray-300 rounded py-3 px-3 w-72 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-black"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-red-500 text-sm h-4">{passwordError}</div>
            </div>
            <div className="mb-2">
              <input
                className="font-lato appearance-none border border-gray-300 rounded py-3 px-3 w-72 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-black"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="text-red-500 text-sm h-4">
                {confirmPasswordError}
              </div>
            </div>
          </div>
          <div>
            <button
              className="font-mont-b bg-slate-800 hover:bg-slate-900 text-white rounded px-6 py-3"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
