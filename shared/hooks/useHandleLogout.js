/* custom hook that accesses logout from AuthContext and navigate users
to root route */
import { useAuth } from "@shared/hooks/useAuth";

export const useHandleLogout = (navigate) => {
  const { logout } = useAuth();

  return () => {
    logout();
    navigate("/");
  };
};
