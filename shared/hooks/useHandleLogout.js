/* custom hook that accesses logout from AuthContext and navigate users
to root route */
import { useNavigate } from "react-router-dom";
import { useAuth } from "@shared/hooks/useAuth";

export const useHandleLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return () => {
    logout();
    navigate("/");
  };
};
