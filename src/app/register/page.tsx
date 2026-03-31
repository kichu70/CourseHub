"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MenuItem, Select, TextField } from "@mui/material";

import "./Register.css";
import profile_pic from "../../../public/profile.jpg"

const Register = () => {

  
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<string>(profile_pic.src);



  // --------image -----------
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleImageClick = () => {
    fileInputRef.current?.click();
  };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      console.log(image)
    }
  };

  const deleteprofile =()=>{
    try{
      setImage(profile_pic.src)
      console.log(image)
    }
    catch(err){
      console.log(err,"error is in the x button")
    }
  }
  
  // --------------------


  

  const addUser = async () => {
    try {
    } catch (err) {
      console.log(err, "error is in the frontend add user  ");
    }
  };






  return (
    <div className="register">
      <div className="card">
        {/* Profile Image */}
        <div className="profile">
          <img
        src={image}
        // alt="profile"
        onClick={handleImageClick}
        style={{
          cursor: "pointer",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
        <span className="imgDeletBtn" onClick={deleteprofile}>x</span>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: "none" }}
        accept="image/*"
      />
        </div>
        <h2>Create Account</h2>

        {/* Inputs */}
        <TextField
          placeholder="Username"
          variant="standard"
          className="custom-input"
          fullWidth
          sx={{
            "& .MuiInput-underline:before": {
              borderBottomColor: "purple", // default
            },
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "purple", // hover
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#f72585", // when focused
            },
          }}
        />

        <TextField
          placeholder="Bio"
          variant="standard"
          className="custom-input"
          fullWidth
          sx={{
            "& .MuiInput-underline:before": {
              borderBottomColor: "purple", // default
            },
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "purple", // hover
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#f72585", // when focused
            },
          }}
        />

        <TextField
          type="email"
          placeholder="Email"
          variant="standard"
          className="custom-input"
          fullWidth
          sx={{
            "& .MuiInput-underline:before": {
              borderBottomColor: "purple", // default
            },
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "purple", // hover
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#f72585", // when focused
            },
          }}
        />

        <TextField
          type="password"
          placeholder="Password"
          variant="standard"
          className="custom-input"
          sx={{
            "& .MuiInput-underline:before": {
              borderBottomColor: "purple", // default
            },
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "purple", // hover
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#f72585", // when focused
            },
          }} // this is used to make the underline to purple color
          fullWidth
        />

        <TextField
          type="password"
          placeholder="Confirm Password"
          variant="standard"
          // InputProps={{ disableUnderline: true }} // removes the default underline that MUI adds
          className="custom-input"
          fullWidth
          sx={{
            "& .MuiInput-underline:before": {
              borderBottomColor: "purple", // default
            },
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "purple", // hover
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#f72585", // when focused
            },
          }}
        />

        <Select
          className="tf-select"
          variant="standard"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
          displayEmpty
          renderValue={(selected) =>
            selected ? (
              selected
            ) : (
              <span style={{ color: "rgba(255,255,255,0.4)" }}>Select</span>
            )
          }
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="instructor">Instructor</MenuItem>
        </Select>

        {/* Button */}
        <button className="btn">Sign Up</button>

        {/* Link */}
        <p className="link">
          Already have an account?{" "}
          <span onClick={() => router.push("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
