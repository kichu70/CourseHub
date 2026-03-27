"use client";

import React, { useState } from "react";
import "./Login.css";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";

export default function Login() {
  const [show, setShow] = useState(false);
  const router =useRouter()
  

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
              Join thousands of learners mastering development, design and more.
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

        <form>
          {/* Email */}
          <div className="field">
            <label>Email address</label>
            <input type="email" placeholder="you@example.com" />
          </div>

          {/* Password */}
          <div className="field">
            <div className="field-row">
              <label>Password</label>
            </div>

            <div className="input-wrap">
              <input
                type={show ? "text" : "password"}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShow(!show)}
              >
                👁
              </button>
            </div>
          </div>

          <button className="btn-submit">Sign in →</button>

        </form>
        <h6>Don't have an account?<span onClick={()=>router.push("/register")}> Create one free</span></h6>
      </div>
    </div>
    </>
  );
}
