import { useContext } from 'react';
import { Outlet,Navigate } from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContext';


const ProtectedRoute = () => {
  const {isAuthenticated ,loading} = useContext(AuthContext)
  console.log(isAuthenticated)
  if(isAuthenticated || loading){
    return (
      isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
    
  }
 
  
}

export default ProtectedRoute;