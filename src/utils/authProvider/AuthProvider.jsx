import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserFromToken = () => {
      try {
        const token = Cookies.get("accessToken");
        console.log("Token", token);
        if (token) {
          const decoded = jwtDecode(token);
          console.log("Decoded", decoded);
          setUser(decoded);
          setLoading(false);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };
    getUserFromToken();
  }, []);

  return { user, setUser, loading };
};

export default AuthProvider;
