import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  if (localStorage.getItem("userToken") == null) {
    return <Navigate to="/login" />;
  } else {
    return props.children;
  }
}

export default ProtectedRoute;
