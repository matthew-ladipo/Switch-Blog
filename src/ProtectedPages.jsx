import { useLocation, Outlet, Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import Nav from "./components/Nav";
import Footer from "./FOOTER/Footer";

export const Protected = ({handleLogout,search,setSearch}) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  if (!auth) {
    return <Navigate to="/" replace state={{ path: location.pathname }} />;
  }
  return (
    <>
      <Nav logout={handleLogout } search={search} setSearch={setSearch} />
      <Outlet />
      <Footer />
    </>
  );
};
