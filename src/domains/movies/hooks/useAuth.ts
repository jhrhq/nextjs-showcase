"use client";
import { useState } from "react";

type initialStateType = {
  id: string;
  name: string;
};

const initialState: initialStateType | null = {
  id: "id1234",
  name: "mock-user",
};

const useAuth = () => {
  const [auth, setAuth] = useState<initialStateType | null>(initialState);

  return { auth, setAuth };
};

export default useAuth;
