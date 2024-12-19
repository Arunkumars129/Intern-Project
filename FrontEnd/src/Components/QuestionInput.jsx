import FileUpload from "./FileUpload";
import AnswerBox from "./AnswerBox";
import "../App.css";
import { useState,useContext } from "react";
import axios from "axios"

import { UserContext } from "../Contexts/UserContext";

const QuestionInput = () => {
  const [prompt, setPrompt] = useState("");
  const [message,setMessage] = useState(null)
  const {saveMessage} = useContext(UserContext)
  const openai_Url = "http://localhost:3000/api/user/chat"
  //collect the data from input 
  const handleInput = (e) => {
    setPrompt(e.target.value);
    console.log(prompt)
  };

  const handleSubmit =async (e)=>{
    e.preventDefault()
    try {
      const response = await axios.post(openai_Url,{prompt})

      console.log(response.data)
      const result = response.data.message
      saveMessage(result)
      // setMessage(result)
      console.log(message)
    } catch (error) {
      console.log(error)
    }
    setPrompt("")
  }
  return (
    <div
      className="container QuestionInput d-flex flex-column  justify-content-center align-items-center "
      style={{ marginTop: "60vh" }}
    >
      {/* <AnswerBox message={message}/> */}
      <FileUpload />
      <div
        className="d-flex align-items-center justify-content-evenly w-50 rounded-pill shadow-lg px-3 py-2 mt-3 "
        style={{ backgroundColor: "#77b1b5" }}
      >
        <input
          type="text"
          name="prompt"
          value={prompt}
          className="form-control no-focus-border border-0"
          placeholder="Ask your questions..."
          onChange={handleInput}
          style={{ backgroundColor: "#77b1b5",border: "none",
            outline: "none",
            boxShadow: "none",
            borderColor: "transparent" }}
        />
        <i className="bi bi-send-fill fs-5" onClick={(e)=>handleSubmit(e)}></i>
      </div>
    </div>
  );
};

export default QuestionInput;
