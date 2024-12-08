// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

// const AuthProvider = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const getUserFromToken = () => {
//       try {
//         const token = Cookies.get("accessToken");
//         console.log("Token", token);
//         if (token) {
//           const decoded = jwtDecode(token);
//           console.log("Decoded", decoded);
//           setUser(decoded);
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.log(error);
//         setUser(null);
//       }
//     };
//     getUserFromToken();
//   }, []);

//   return { user };
// };

// export default AuthProvider;

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserFromToken = () => {
      try {
        const token = Cookies.get("accessToken");
        if (token) {
          const decoded = jwtDecode(token);
          setUser(decoded);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };
    getUserFromToken();
  }, []);

  const logout = () => {
    Cookies.remove("accessToken"); // Clear the token from cookies
    setUser(null); // Reset user state
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
