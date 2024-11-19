import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  authLoadingAtom,
  isAdminAtom,
  isLoginAtom,
} from "../store/atoms/userAtom";

const AdminProtectedRoute = ({ element }: { element: any }) => {
  const isLogin = useRecoilValue(isLoginAtom);
  const authLoading = useRecoilValue(authLoadingAtom);
  const isAdmin = useRecoilValue(isAdminAtom);

  if (authLoading) {
    return (
      <main className="width100 flex alignCenter justifyCenter">
        <section className="renderLoading width95 maxWidth flex alignCenter justifyCenter">
          <div className="renderLoader"></div>
        </section>
      </main>
    );
  }

  return !isLogin && !isAdmin ? element : <Navigate to="/profile" replace />;
};

export default AdminProtectedRoute;
