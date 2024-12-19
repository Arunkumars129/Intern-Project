import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext"

const AnswerBox = () => {
  const {message} = useContext(UserContext)
  return (
    <div className="container d-flex justify-content-center mt-3 h-100 mb-3">
     
       <p>{message}</p>
    </div>
  )
}

export default AnswerBox