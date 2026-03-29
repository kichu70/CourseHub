"use client";

import React, { useState } from "react";
import "./Login.css";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth";
import Navbar from "@/components/navbar/Navbar";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const { login } = useAuth();
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();
  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email.trim() || !password || password.length < 8) {
        setError(true);
        return;
      } else {
        setError(false);
        login(email, password);
      }
    } catch (err) {
      console.log(err, "error is in the submit....");
    }
  };
  return (
    <>
      <div className="login">
        {/* LEFT */}
        <div className="left">
          <div className="left-bg"></div>
          <div className="orb orb1"></div>
          <div className="orb orb2"></div>
          <div className="orb orb3"></div>
          <div className="grid-overlay"></div>

          <div className="left-content">
            <div className="logo">
              <div className="logo-mark">⚡</div>
              <span className="logo-name">
                Course<span>Hub</span>
              </span>
            </div>

            <div className="hero">
              <h1 className="hero-title">
                Learn skills that <br />
                <span className="grad">open doors.</span>
              </h1>

              <p className="hero-sub">
                Join thousands of learners mastering development, design and
                more.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right">
          <div className="form-header">
            <h2 className="form-title">Welcome back</h2>
            <p className="form-sub">
              Sign in to continue your learning journey
            </p>
          </div>

          <form onSubmit={onsubmit}>
            {/* Email */}
            <div className="field">
              <TextField
                fullWidth
                className="text"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={
                  error &&
                  (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                }
                helperText={
                  error && !email.trim()
                    ? "Email is Required"
                    : error &&
                        email &&
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                      ? "Invalid email format"
                      : ""
                }
              />
            </div>

            {/* Password */}
            <div className="field">
              <TextField
                fullWidth
                className="text"
                label="Password"
                type={show ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error && (!password || password.length < 8)}
                helperText={
                  error && !password
                    ? "Password is Required"
                    : error && password.length < 8
                      ? "Password must contain at least 8 characters"
                      : ""
                }
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShow(!show)} edge="end">
                          {show ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            <button className="btn-submit" type="submit">
              Sign in →
            </button>
          </form>
          <h6>
            Don't have an account?
            <span onClick={() => router.push("/register")}>
              Create one free
            </span>
          </h6>
          <h6>
            <span>forget password ??</span>
          </h6>
        </div>
      </div>
    </>
  );
}
