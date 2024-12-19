import { Link } from "react-router-dom";


const HomePage = () => {
  return (
    <div className="conatiner min-vh-100 justify-content-center align-content-center">
      <h1 className="display-1 text-center">Your Friendly AI Assistant</h1>
      <h4 className="display-6 text-center"> Ask me anything, anytime.</h4>

      <div className=" d-flex justify-content-center mt-4">
        <Link to="/login">
          <button className="btn btn-primary px-4 rounded-pill">Login</button>
        </Link>
        <Link to="/create">
          <button className="btn btn-primary px-4 mx-4 rounded-pill">
            Register Now
          </button>
        </Link>
      </div>
     
    </div>
  );
};

export default HomePage;
