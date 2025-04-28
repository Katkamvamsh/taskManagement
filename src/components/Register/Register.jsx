
import React, { Fragment, useState } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    emailId: "",
    userName: "",
    password: "",
   
  });

  const [formDataError, setFormDataError] = useState({
    emailIdError: "",
    userNameError: "",
    passwordError: "",
   
  });

  const [passwordShow, setPasswordShow] = useState(false);

  const inputHandler = (event) => {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const showPasswordHandler = () => {
    setPasswordShow(!passwordShow);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const showErrors = {
      emailIdError: "",
      userNameError: "",
      passwordError: ""
    
    };

    let isValid = true;

    if (!formData.emailId) {
      showErrors.emailIdError = "email id is mandatory to fill";
      isValid = false;
    }

    if (!formData.userName) {
      showErrors.userNameError = "userName is mandatory to fill";
      isValid = false;
    }

    if (!formData.password) {
      showErrors.passwordError = "password is mandatory to fill";
      isValid = false;
    } else {
      const passwordRegex = /^[A-Za-z0-9]{6,}$/;
      if (!passwordRegex.test(formData.password)) {
        showErrors.passwordError = "password must contain at least 6 characters & A-Z, a-z, 0-9";
        isValid = false;
      }
    }

    

    setFormDataError(showErrors);

    if (!isValid) return;

    const gettingBackEmailId = localStorage.getItem("emailId");
   
    if (gettingBackEmailId === formData.emailId) {
      alert("This emailId is already registered. Try with another email id.");
      return;
    }

    localStorage.setItem("emailId", formData.emailId);
    localStorage.setItem("password", formData.password);
    alert("Registration successfully completed  emailId and password stored in Local storage");
navigate('/login')
  };

  return (
    <Fragment>
      <form onSubmit={formSubmitHandler}>
        <h1 className="main-heading" >Registration Form</h1>

        <div className="input-main-container">
          <div className="input-container">
            <label htmlFor="userName">USER NAME:</label>
            <input
              className="input-value"
              type="text"
              id="userName"
              placeholder="enter your Name"
              name="userName"
              value={formData.userName}
              onChange={inputHandler}
            />
            <p className="error-style">{formDataError.userNameError}</p>
          </div>

          <div className="input-container">
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

          <div className="input-container">
            <label htmlFor="password">PASSWORD:</label>
            <input
              className="input-password"
              type={passwordShow ? "text" : "password"}
              id="password"
              placeholder="enter your Password"
              name="password"
              value={formData.password}
              onChange={inputHandler}
            />
            <p className="show-password" onClick={showPasswordHandler}>
              {passwordShow ? "Hide Password" : "Show Password"}
            </p>
            <p className="error-style">{formDataError.passwordError}</p>
          </div>

    
     
      <div className="button-container"> 
          <button className="register-button" type="submit">Register</button>
          <button className="register-button exist-register-button" onClick={navigateToLogin}>Have account? Login</button>
     </div>    
        </div>
      </form>
    </Fragment>
  );
};

export default Register;
