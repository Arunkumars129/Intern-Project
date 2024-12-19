import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";

const SubcriptionPage = () => {
  const { saveUserPlanData, updatePlanUserData } = useContext(UserContext);
  const navigate = useNavigate();

  // handle the plandata from user select plan
  const handlePlanData = async (plan) => {
    console.log("plan:", plan);
    saveUserPlanData(plan);
    const paymentUrl = "http://localhost:3000/api/user/payment";
    try {
      const plans = { plan: plan };
      if (plan !== "Free") {
        const response = await axios.post(paymentUrl, plans);
        if (response.data) {
          window.location.href = response.data.url; // stripe payment url
        }
      } else {
        navigate("/success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center ">
        <div className="row">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold">
              Elevate Your Experience with InternPro Premium
            </h1>
            <p className="fs-5 mt-2">
              Unlock exclusive features and prioritize your support.
            </p>
          </div>
          <div className="col col-md-4 col-xs-12">
            <div className="card shadow p-3 mb-5 bg-body rounded ">
              <div className="card-body">
                <h3 className="card-text">Free</h3>
                <p>expires in 24 hours</p>
                <ul>
                  <li>Max file size : 5MB</li>
                  <li>OCR support : Yes</li>
                  <li>Customer support : No</li>
                  <li>Totalsessions :limited</li>
                </ul>
                {updatePlanUserData ? (
                  <button disabled className="btn btn-primary w-100">
                    Free Trail Expired
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary w-100"
                    onClick={() => handlePlanData("Free")}
                  >
                    Start Free Trail
                  </button>
                )}
              
              </div>
            </div>
          </div>
          <div className="col col-md-4 col-xs-12">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h3>Pro</h3>
                <p>Rs.999/- per month</p>
                <ul>
                  <li>Max file size : 5MB</li>
                  <li>OCR support : Yes</li>
                  <li>Customer support :Yes</li>
                  <li>Totalsessions : Unlimited</li>
                </ul>

                <button
                  className="btn btn-primary w-100"
                  onClick={() => handlePlanData("Pro")}
                >
                  Select Plan
                </button>
              </div>
            </div>
          </div>
          <div className="col col-md-4 col-xs-12">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h3>Advanced</h3>
                <p>Rs.3499/- per year</p>
                <ul>
                  <li>Max file size : 5MB</li>
                  <li>OCR support : Yes</li>
                  <li>Customer support : Yes</li>
                  <li>Totalsessions : Unlimited</li>
                </ul>

                <button
                  className="btn btn-primary w-100"
                  onClick={() => handlePlanData("Advanced")}
                >
                  Select Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcriptionPage;
