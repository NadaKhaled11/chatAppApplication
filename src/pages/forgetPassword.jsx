import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import img from "../assets/Forgot password-bro.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";

function Forgetpassword() {
  const [email, setEmail] = useState("");
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

  const sendCode = (e) => {
    e.preventDefault();
    setLoading(true); 

    axios
      .post("https://chat-prod-dvbe.onrender.com/api/v1/auth/forgetPassword", {
        email,
      })
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data);
          toast.success("Code Send Successfully ");
          setTimeout(() => {
            navigate("/verificationforget");
          }, 5000);
        }
      })
      .catch((error) => {
        console.log(error);
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
            Forget password
          </h1>
          <p style={{ color: "#78aaa1", fontSize: "20px" }}>
            Enter the email address associated with your account
          </p>
          <TextField
            id="outlined-basic"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            required
            type="email"
            variant="outlined"
            size="small"
            sx={{ display: "block", marginBottom: "5%" }}
          />
          <Link
            to={"/Verificationcode"}
            style={{ color: " white ", textDecoration: "none" }}
          >
            <Button
              variant="outlined"
              type="submit"
              onClick={sendCode}
              className="btn"
              style={{ borderRadius: "5px", width: "100%" }}
              disabled={loading} 
            >
              {loading ? "Sending..." : "Continue"}
            </Button>
          </Link>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Forgetpassword;
