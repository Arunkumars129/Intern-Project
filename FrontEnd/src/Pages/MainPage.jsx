import { useContext } from "react";
import AnswerBox from "../Components/AnswerBox";
import QuestionInput from "../Components/QuestionInput";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";
const MainPage = () => {
const {isAuthenticated} = useContext(AuthContext)
if(!isAuthenticated){
  return <Navigate to= "/login"/>
}
  return (
    <div>
      <AnswerBox/>
      <QuestionInput />
    </div>
  );
};

export default MainPage;
