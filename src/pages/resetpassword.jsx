import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import img from "../assets/Reset password-amico.png";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useEffect } from "react";

function Resetpassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

  const sendData = (e) => {
    e.preventDefault();
    setLoading(true); 

    axios
      .patch(
        "https://chat-prod-dvbe.onrender.com/api/v1/auth/resetPassword",
        {
          password,
          passwordConfirm,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Password Reset Successfully");
          Cookies.remove("jwt", res.data.token);
          setTimeout(() => {
            navigate("/login");
             
          }, 5000);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message);
        setLoading(false); 
      })
     
  };

  return (
    <>
      <div
        style={{
          marginInline: "5%",
          display: "flex",
          flexDirection: windowWidth > 900 ? "row" : "column",
          justifyContent: "center",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <div style={{ width: "50%", alignItems: "center" }}>
          <img src={img} alt="" style={{ width: "90%", height: "100%" }} />
        </div>
        <div style={{ width: "330px" }}>
          <h1
            style={{
              marginBottom: "30px",
              opacity: "0.7",
              display: windowWidth > 900 ? "block" : "none",
              textAlign: "center",
            }}
          >
            Reset password
          </h1>
          <TextField
            id="outlined-basic"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="New password"
            required
            type="password"
            variant="outlined"
            size="small"
            style={{ display: "block", marginBottom: "5%" }}
          />
          <TextField
            id="outlined-basic"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            label="Confirm New Password"
            required
            type="password"
            variant="outlined"
            size="small"
            style={{ display: "block", marginBottom: "5%" }}
          />
          <Button
            variant="outlined"
            type="submit"
            onClick={sendData}
            className="btn"
            style={{ borderRadius: "5px", width: "100%" }}
            disabled={loading} 
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Resetpassword;
