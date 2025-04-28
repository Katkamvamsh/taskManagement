import React, { Fragment, useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const [formDataError, setFormDataError] = useState({
    emailIdError: "",
    passwordError: "",
  });

  const [passwordShow, setPasswordShow] = useState(false);

  const inputHandler = (event) => {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showPasswordHandler = () => {
    setPasswordShow(!passwordShow);
  };

  // const navigateToRegister = () => {
  //   navigate("/");
  // };

  const loginFormSubmission = (event) => {
    event.preventDefault();

    const showErrors = {
      emailIdError: "",
      passwordError: ""
    };

    // initialaztion for no errors in form validation 
    let isValid = true;

    if (!formData.emailId) {
      showErrors.emailIdError = "email id is mandatory to fill";
      isValid = false; // means if its false it will not oved to the next validatein line
    }

    if (!formData.password) {
      showErrors.passwordError = "password is mandatory to fill";
      isValid = false;
    }

    setFormDataError(showErrors);

    if (!isValid) return;

    //getting token from local storage to form validations 
    const emailIdExist = localStorage.getItem("emailId");
    const passwordExist = localStorage.getItem("password");


    if (emailIdExist !== formData.emailId) {
      alert("Email id is not registered");
      return;
    }
   if(passwordExist !== formData.password){
    alert("password is in correct")
    return
   }
 
  alert("Login is successfully completed")
  localStorage.setItem("token", 12345678910);
alert("Token successfully stored");

   navigate("/creditCard")
     };

  return (
    <Fragment>
      <h1 className='main-heading'>LOGIN PAGE</h1>
      <form onSubmit={loginFormSubmission}>
    <div className='login-input-main-container'>

          <div className="login-input-container">
            <label htmlFor="emailId">EMAIL ID:</label>
            <input
              type="email"
              id="emailId"
              placeholder="enter your Email"
              name="emailId"
              value={formData.emailId}
              onChange={inputHandler}
            />
            <p className="error-style">{formDataError.emailIdError}</p>
          </div>

          <div className="login-input-container">
            <label htmlFor="password">PASSWORD:</label>
            <input
              className="login-input-password"
              type={passwordShow ? "text" : "password"}
              id="password"
              placeholder="enter your Password"
              name="password"
              value={formData.password}
              onChange={inputHandler}
            />
            <p className="login-show-password" onClick={showPasswordHandler}>
              {passwordShow ? "Hide" : "Show"}
            </p>
            <p className="error-style">{formDataError.passwordError}</p>
            <button className='login-button' type='submit'>Login</button>
        
          </div>
   </div>
      </form>
    </Fragment>
  );
};

export default Login;

