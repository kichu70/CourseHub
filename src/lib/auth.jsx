"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { setCookie } from "./cookies/setCookies";
import { clearCookie } from "./cookies/clearCookies";
import { getCookie } from "./cookies/getCookies";
import { AUTH_API, STUDENT_API } from "@/lib/constants/apiUrl";

const AuthContext = createContext();

export const AuthProvider = ({ children, cookieData }) => {
  const router = useRouter();

  const [token, setToken] = useState(cookieData?.token || null);
  const [user, setUser] = useState(cookieData?.user || null);
  const [userId, setUserId] = useState(null);

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {}, [token]);

  useEffect(() => {
    if (!cookieData) {
      return;
    } else {
      setToken(cookieData.token);
      setUser(cookieData.user);
    }
  }, []);


  // ---------------login----------------

  const login = async (email, password) => {
    try {
      const res = await axios.post(AUTH_API.LOGIN, {
        email,
        password,
      });
      const token1 = res.data.AccessToken;
      const userData = res.data.userData;

      setToken(token1);
      setUser(userData);
      setUserId(userData.id);
      setCookie(token1, userData);
      if (token1) {
        if (userData.role === "admin") {
          router.push("/admin");
          toast.success("login admin");
        } else if (userData.role === "student") {
          toast.success("login student");
          router.push("/");
          // console.log("ok**");
        } else if (userData.role === "instructor") {
          toast.success("login Instructor");
          router.push("/instructor");
        }
      } else {
        return;
      }
    } catch (err) {
      console.log(err, "error is in the login fr", { email, password });
      toast.error("invalid email or password");
    }
  };

  // ---------------logout -------------

  const logout = () => {
    // clear react state
    setToken(null);
    setUser(null);
    setUserId(null);

    clearCookie();

  
    // clear cookies

    toast.success("logout successfully");
    router.push("/login");
  };

  // ------------adding token on register ----------

  const setAuthState = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    if (newToken && newUser) {
      setCookie(newToken, newUser);
      router.push("/");
    } else {
      clearCookie();
    }
  };

  // -------reuseble function------

  const reusebleFunction = (callback) => {
    if (!token) {
      toast.dark("Login to access this");

      router.push("/login");
      return;
    }
    if (user.role === "admin") {
      toast.info("Admin can't use this functions");
      return;
    }
    if (user.role === "instructor") {
      toast.info("Instructor can't use this functions");
      return;
    }

    callback();
  };

  // ---------------if logined then logout out to login as user------------
  const blockLoginForStudent = () => {
    if (token && user) {
      return true; // block navigation
    }
    return false; // allow
  };

 

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <AuthContext.Provider
        value={{
          user,
          token,
          login,
          userId,
          logout,
          setAuthState,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
export const useAuth = () => useContext(AuthContext);