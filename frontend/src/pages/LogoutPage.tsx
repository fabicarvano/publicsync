import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("perfil");
    navigate("/login");
  }, [navigate]);

  return null;
};

export default LogoutPage;
