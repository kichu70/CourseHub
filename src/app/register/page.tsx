"use client";

import React from "react";
import "./Register.css";
import { useRouter } from "next/navigation";

const Register = () => {
const router =useRouter()



  return (
    <div className="register">
      <div className="card">

        {/* Profile Image */}
        <div className="profile">
          <img src="/profile.jpg" alt="profile" />
          <input type="file" />
        </div>

        <h2>Create Account</h2>

        {/* Inputs */}
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        {/* Button */}
        <button className="btn">Sign Up</button>

        {/* Link */}
        <p className="link">
          Already have an account? <span onClick={() => router.push("/login")}>Login</span>
        </p>

      </div>
    </div>
  );
};

export default Register;