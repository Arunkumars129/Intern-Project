import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import { UserContext } from "../Contexts/UserContext";

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { verifyAuth } = useContext(AuthContext);
  const {saveUpdatePlanuserData} = useContext(UserContext)

  const loginUrl = "http://localhost:3000/api/user/login";

  //collect the input data
  const handleFormData = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
    
  };

  // verify the email and password
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(loginUrl, formData, {
        withCredentials: true,
      });
      
      const accessToken = response.data.token;
      // console.log(accessToken)
      localStorage.setItem("accessToken", accessToken); //store the token in local storage
      toast.success(response.data.message);

      verifyAuth(); // from authcontext
      navigate("/daseboard");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
      
      //plan is expired and then redirct to pricing page
      const statusCode = error.response?.status;
      
      if (statusCode) {
        navigate("/price");
        saveUpdatePlanuserData(formData)
      }
    }
  };
  return (
    <>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center ">
        <form
          className="shadow-lg p-5 mb-5 bg-content rounded mt-5"
          onSubmit={handleLogin}
          style={{ backgroundColor: "#77b1b5" }}
        >
          <h3 className="text-center mb-3">Log In</h3>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control no-focus-border"
              aria-describedby="emailHelp"
              name="email"
              required
              onChange={handleFormData}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="d-flex align-items-center border rounded px-2 bg-white">
              <input
                type={show ? "text" : "password"}
                className="form-control no-focus-border"
                name="password"
                required
                autoComplete="current-password"
                onChange={handleFormData}
                style={{
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  borderColor: "transparent",
                }}
              />
              <i
                onClick={() => {
                  setShow(!show);
                }}
                className={show ? " bi-eye-fill" : "bi-eye-slash-fill"}
              ></i>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </div>
          <p className=" text-center mt-3">
            Don't have an account ? <Link to="/create">create now</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
