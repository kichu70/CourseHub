"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import "./Register.css";
import profile_pic from "../../../public/profile.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../lib/auth";
import { AUTH_API } from "@/lib/constants/apiUrl";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmpassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(profile_pic.src);

  const { setAuthState } = useAuth();
  // --------image -----------
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file); // ✅ store file
      setPreview(URL.createObjectURL(file)); // ✅ preview
    }
  };

  const deleteprofile = () => {
    try {
      setSelectedImage(null);
      setPreview(profile_pic.src)
    } catch (err) {
      console.log(err, "error is in the x button");
    }
  };

  // --------------------

  const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (
        !name.trim() ||
        !email.trim() ||
        !password ||
        password.length < 8 ||
        password !== confirmpassword
      ) {
        setError(true);
        toast.error("please fill all required feilds correctly");
        return;
      } else {
        setError(false);
      }
      if (password !== confirmpassword) {
        setError(true);
        toast.error("password not match");
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("bio", bio);
        formData.append("role", role);
        if (selectedImage) {
          formData.append("profile", selectedImage);
        }
        const res = await axios.post(AUTH_API.REGISTER, formData);
        console.log("added user", res.data.AccessToken);
        toast.success("user Created!!");

        setAuthState(res.data.AccessToken, res.data.userData);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmpassword("");
        setBio("");
        setRole("");
        setSelectedImage(null);
      }
      console.log(name);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as {
          message?: string;
          msg?: Record<string, string>;
        };
        if(data?.message){
          toast.error(data.message)
        }
        if (data?.msg) {
          Object.values(data.msg).forEach((errorMsg) => {
            toast.error(errorMsg);
          });
        }
      } else {
        toast.error("Something went wrong");
        console.log(
          err,
          "Something went wrong error is in the frontend add user. ",
        );
      }
    }
  };

  return (
    <form onSubmit={addUser}>
      <div className="register">
        <div className="card">
          {/* Profile Image */}
          <div className="profile">
            <img
              src={preview}
              onClick={handleImageClick}
              style={{
                cursor: "pointer",
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span className="imgDeletBtn" onClick={deleteprofile}>
              x
            </span>

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
            required
            error={error && !name.trim()}
            helperText={error && !name.trim() ? "Username is required" : ""}
            onChange={(e) => setName(e.target.value)}
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
            error={error && !bio.trim()}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={
              error &&
              (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            }
            helperText={
              error && !email.trim()
                ? "Email is required"
                : error && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                  ? "Invalid email format"
                  : ""
            }
            required
          />

          <TextField
            type={show ? "text" : "password"}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            //   focused
            error={error && (!password || password.length < 8)}
            helperText={
              error && !password
                ? "Password is required"
                : error && password.length < 8
                  ? "Password must be at least 8 characters"
                  : ""
            }
            required
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton className="eye" onClick={() => setShow(!show)}>
                    {show ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              },
            }}
          />

          <TextField
            type={show ? "text" : "password"}
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
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            //   focused
            error={Boolean(
              error && password !== confirmpassword
                ? "Passwords do not match"
                : "",
            )}
            helperText={
              error &&
              (password !== confirmpassword ? "Passwords do not match" : "")
            }
            required
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
    </form>
  );
};

export default Register;
