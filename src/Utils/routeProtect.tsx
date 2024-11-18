import { Navigate } from "react-router-dom";
import { isLoginAtom } from "../store/atoms/userAtom";
import { useRecoilValue } from "recoil";
const RouteProtect = () => {
  const isLogin = useRecoilValue(isLoginAtom);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return null;
};

export default RouteProtect;
