import { Navigate } from "react-router-dom";
  
export default function ProtectedRoute({auth, outlet}) {
    if(auth) {
        return outlet;
    } else {
        return <Navigate to={{ pathname: "/" }} />;
    }
};