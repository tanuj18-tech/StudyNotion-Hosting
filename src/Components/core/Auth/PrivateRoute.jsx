 import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
// only logged in user hi access karpaye
export const PrivateRoute = ({children}) => {
    
    const {token} = useSelector((state) => state.auth);
    if(token!= null){
        return children;
    }

    else return <Navigate to = "/login"></Navigate>
  return (
    <div>
        
    </div>
  )
}
