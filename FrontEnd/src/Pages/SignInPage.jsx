import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = () => {
    setEmailError("");
    setpasswordError("");
    if (!email) {
      setEmailError("Please enter a email address.");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    }
    if (!password) {
      setpasswordError("Please enter the password");
    }
    if (email && password) {
      console.log(`Email: ${email}, Password: ${password}`);
      navigate("/chat");
    }
  };

  return (
    <div className="w-full h-screen bg-slate-300">
      <div className="absolute top-6 left-10 font-gaegu font-bold text-3xl">
        <Link to="/">| TherapEase</Link>
      </div>
      <div className="flex justify-center items-center h-screen shadow-lg ">
        <div className="w-3/12 h-4/6 rounded-tl-lg rounded-bl-lg bg-white flex flex-col justify-center items-center ">
          <div className="font-mont-b flex items-center justify-center h-20 text-3xl">
            Sign In
          </div>
          <div className="pt-4">
            <div className="mb-4">
              <input
                className="font-lato appearance-none border border-gray-300 rounded py-3 px-3 w-72 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-black"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-red-500 text-sm w-full h-2">
                {emailError}
              </div>
            </div>
            <div>
              <input
                className="font-lato appearance-none border border-gray-300 rounded py-3 px-3 w-72 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-black"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-red-500 text-sm mb-4 w-full h-6">
                {passwordError}
              </div>
            </div>
          </div>
          <div>
            <button
              className="font-mont-b bg-slate-800 hover:bg-slate-900 text-white rounded px-6 py-3"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="w-3/12 h-4/6 rounded-tr-lg rounded-br-lg text-white flex flex-col justify-center items-center bg-indigo-600 border-8 border-white">
          <div className="font-mont-b text-3xl mb-4">Hello, There!</div>
          <div className="font-mont text-base font-semibold mb-8">
            Don&apos;t have an account? Sign Up
          </div>
          <div>
            <Link to="/SignUp">
              <button className="font-mont-b border border-white py-2 px-4 rounded transition duration-500 ease-in-out hover:bg-white hover:text-black">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
