import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
const SubmissionPage = () => {
  const createPlanUrl = "http://localhost:3000/api/user/plan";

  const data = localStorage.getItem("userfulldata");
  const userData = JSON.parse(data);

  console.log(data);

  useEffect(() => {
    createprofile(userData);
  }, [data]);

  const createprofile = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(createPlanUrl, data);
      const resp = response.data;
      if (resp) {
        localStorage.removeItem("userfulldata");
      }
      console.log("success", resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1> Payment successfully !</h1>
        <Link to={"/login"}>
          <button className="btn btn-primary">LogIn</button>
        </Link>
      </div>
    </div>
  );
};

export default SubmissionPage;
