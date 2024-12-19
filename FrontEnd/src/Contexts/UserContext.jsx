import { createContext, useState,useEffect } from "react";


export const UserContext = createContext();

export const UserReg = ({ children }) => {

  const [userRegData, setUserRegData] = useState(null);
  const [ updatePlanUserData,setUpdatePlanUserData] = useState()
  const [message ,setMessage] = useState(null);

  const saveUserRegData = (formdata) => {
    setUserRegData(formdata);
    console.log("save");
  };

  //save the user full data
  const saveUserPlanData = (planData) => {
    const UserFullData = {
      ...userRegData,
      plan: planData,
    };
    console.log(UserFullData)
    localStorage.setItem("userfulldata",JSON.stringify(UserFullData));
  };

  //save the gemini api result message
    const saveMessage = (message)=>{
        setMessage(message)
    }

    //upgrade or buy new plan data

    const saveUpdatePlanuserData = (data)=>{
      setUpdatePlanUserData(data)
    }

  return (
    <UserContext.Provider
      value={{
        userRegData,
        saveUserRegData,
        saveUserPlanData,
        saveMessage,
        message,
        saveUpdatePlanuserData,
        updatePlanUserData
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
