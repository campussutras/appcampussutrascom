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

  // Redirect if not logged in or not an admin
  if (!isLogin || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component for admins
  return element;
};

export default AdminProtectedRoute;
