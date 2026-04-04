"use client";

import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import logo from "../../../public/logos/navbarLogo.png";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 🔥 close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar" ref={menuRef}>
      <div className="navbar-content">

        {/* LEFT */}
        <div className="nav-left">
          <Image onClick={()=>router.push("/")} src={logo} alt="EduClass" className="home" />
        </div>

        {/* DESKTOP */}
        <div className="nav-center">
          <Button>all course</Button>
          <Button>paid course</Button>
          <Button>free course</Button>
        </div>

        <div className="nav-right">
          <Button onClick={() => router.push("/login")}>login</Button>
          <Button onClick={() => router.push("/register")}>signup</Button>
        </div>

        {/* MOBILE ICON */}
        <div className="menu-icon" onClick={() => setOpen(!open)}>
          {open ? "✖" : "☰"}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${open ? "active" : ""}`}>
        <Button>all course</Button>
        <Button>paid course</Button>
        <Button>free course</Button>
        <Button onClick={() => router.push("/login")}>login</Button>
        <Button onClick={() => router.push("/register")}>signup</Button>
      </div>
    </div>
  );
};

export default Navbar;