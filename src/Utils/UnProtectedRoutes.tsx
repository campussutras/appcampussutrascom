import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginAtom, authLoadingAtom } from "../store/atoms/userAtom";

const UnProtectedRoute = ({ element }: { element: any }) => {
  const isLogin = useRecoilValue(isLoginAtom);
  const authLoading = useRecoilValue(authLoadingAtom);

  if (authLoading) {
    return (
      <main className="width100 flex alignCenter justifyCenter">
        <section className="renderLoading width95 maxWidth flex alignCenter justifyCenter">
          <div className="renderLoader"></div>
        </section>
      </main>
    ); // Or your loading spinner
  }

  return !isLogin ? element : <Navigate to="/profile" replace />;
};

export default UnProtectedRoute;
