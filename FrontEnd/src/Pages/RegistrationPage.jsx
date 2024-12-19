import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../Contexts/UserContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { saveUserRegData } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(false);
  // const [error, setError] = useState("");
  const navigate = useNavigate();

  const createUrl = "http://localhost:3000/api/user/create";

  // create the userdetail in object
  const handleFormData = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  //verify the user details 
  const createProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(createUrl, formData); //validate the register page

      console.log(response.data);
      saveUserRegData(formData); //save the object in usecontext
      if (response.data) {
        navigate("/price");
      }
    } catch (error) {
      // setError(error.response.data.message);
      toast.error(error.response.data.message)
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form
          action=""
          className="shadow-lg p-5 mb-5 bg-content rounded mt-5"
          onSubmit={check ? createProfile : null}
          style={{ backgroundColor: "#77b1b5" }}
        >
          <h3 className="text-center mb-3">Create Your Account</h3>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              name="name"
              autoComplete="username"
              onChange={handleFormData}
            />
            {/* <div className="form-text">
              <p className="text-danger">
                {error === "please enter your name" && error}
              </p>
            </div> */}
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              name="email"
              autoComplete="email"
              onChange={handleFormData}
            />
            {/* <div className="form-text">
              <p className="text-danger">
                {error === "please enter your email" && error}
                {error === "please enter valid email address" && error}
                {error === "email is already exists" && error}
              </p>
            </div> */}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="d-flex align-items-center border rounded px-2 bg-white">
              <input
                type={show ? "text" : "password"}
                className="form-control no-focus-border"
                name="password"
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
          {/* <div className="form-text">
            <p className="text-danger">
              {error === "please enter your password" && error}
              {error === "password must be atleast 8 characters" && error}
            </p>
          </div> */}

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={(e) => {
                setCheck(!check);
              }}
            />
            <label className="form-check-label" htmlFor="terms">
              <p>
                I agree and accept the <a href="">terms & condition</a>
              </p>
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100 text-center">
            Create Account
          </button>
          <p className="text-center mt-3">
            Already have an account ! <Link to="/login">login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
