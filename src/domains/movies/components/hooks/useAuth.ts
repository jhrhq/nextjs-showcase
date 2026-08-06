// import { useContext } from "react";

"use client";

import { useState } from "react";

const initialState = {
  id: "id",
  name: "mock-user",
};
const useAuth = () => {
  // const { auth, setAuth } = useContext(AuthContext);
  const [auth, setAuth] = useState(initialState);

  return { auth, setAuth };
};

export default useAuth;
