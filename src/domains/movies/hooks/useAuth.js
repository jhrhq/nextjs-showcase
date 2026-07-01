"use client";
import { useState } from "react";

const initialState = {
  id: "id1234",
  name: "mock-user",
};
const useAuth = () => {
  const [auth, setAuth] = useState(initialState);

  return { auth, setAuth };
};

export default useAuth;
