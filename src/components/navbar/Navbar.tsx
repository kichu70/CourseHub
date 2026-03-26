"use client";

import React from "react";
import "./Navbar.css";
import logo from "../../../public/logos/navbarLogo.png";
import Image from "next/image";
import Button from "@/components/Button";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-content">

 
        {/* ------content1-------- */}
        <div className="nav-left">
          <Image src={logo} alt="EduClass" className="home" />
        </div>


        {/* ------content2-------- */}

        <div className="nav-center">

                  <Button>all course</Button>
                  <Button>paid course</Button>
                  <Button>free course</Button>
    
            
        </div>

        {/* ------content3-------- */}

        <div className="nav-right">
                  <Button>login</Button>
                  <Button>signin</Button>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
