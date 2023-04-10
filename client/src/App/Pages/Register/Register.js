import axios from "axios";

import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Register.css";

/**
 * Client code for registration  page
 * @returns A registration page that asks for user's credentials to regiseter using backend server
 */

export default function Register() {
  // Track the inputs through state management

  const name = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const room = useRef();

  const history = useHistory();

  // Handle form submission

  const handleClick = async (e) => {
    e.preventDefault();

    // Authenticate email format
  
    if(email.current.value.includes("@nyu.edu")){
      // Send the user's credentials to the backend server'

      if (passwordAgain.current.value !== password.current.value) {
        passwordAgain.current.setCustomValidity("Passwords don't match!");
      } else {
        const user = {
          name: name.current.value,
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
          room: room.current.value
        };
  
        try {
          await axios.post("/auth/register", user);
  
          alert("Successful Registration");
  
          history.push("/login");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      // Alert the user and ask for an email change

      alert("You need an NYU email address (i.e., 'nyu.edu')!")
    }
  };

  // Render the registration page with the registration form

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">biddingApp</h3>
          <span className="loginDesc">Let's make sales!</span>
        </div>

        <div className="loginRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Name"
              required
              ref={name}
              className="loginInput"
            />
            
            <input
            placeholder="Username"
            required
            ref={username}
            className="loginInput"
            />

            <input
              placeholder="Email (NYU)"
              required
              ref={email}
              className="loginInput"
              type="email"
            />

            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />

            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />

            <input
              placeholder="Room"
              required
              ref={room}
              className="loginInput"
            />

            <button className="loginButton" type="submit">
              Sign Up
            </button>

            <Link to="/login" >
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>

    </div>
  );
}
