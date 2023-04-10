import { useContext, useRef } from "react";
// import { CircularProgress } from "@material-ui/core";

import { loginCall } from "../../APICalls/APICalls";
import { AuthContext } from "../../Context/AuthContext";

import "./Login.css";

// displays the login page's front end and implements its front end logic
/**
 * A function to solve on click log in event: send credentials to backend server to authenticate
 * @returns  log in page
 */
export default function Login() {
  const email = useRef();
  const password = useRef();

  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();

    // validates if the email address is nyu.edu domain else alerts otherwise
    if(email.current.value.includes("@nyu.edu")){
      loginCall(
        {
          email: email.current.value,
          password: password.current.value
        },
        dispatch
      );
    } else {
      alert("You need an NYU email address (i.e., 'nyu.edu')!")
    }
  };

  // displays the form to get the login user details
  return (
    <div className="login">
      <div className="loginWrapper">
      <div className="loginLeft">
          <h3 className="loginLogo">biddingApp</h3>
          <span className="loginDesc">Let's make sales!</span>
        </div>

        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email (NYU)"
              type="email"
              required
              className="loginInput"
              ref={email}
            />

            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />

            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                // <CircularProgress color="white" size="20px" />
                <div>Wait</div>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
