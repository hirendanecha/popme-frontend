import { useState, useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // fetch token and validate token by server call here
    // on Success response return token
    setToken(token);
    return () => {};
  });

  return token;
};
