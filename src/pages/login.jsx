import React, { useState, useEffect } from "react";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import img from "../assets/Login-rafiki.png";
import google from "../assets/google.png";
import facebook from "../assets/facebook.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [rememberMe, setRememberMe] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    const rememberMeData = Cookies.get('rememberMe') === 'true';
    if (rememberMeData) {
      const emailData = Cookies.get('email') || '';
      const passwordData = Cookies.get('password') || '';
      setEmail(emailData);
      setPassword(passwordData);
      setRememberMe(rememberMeData);
      console.log("no");
    }
  }, []);
  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };
  const setData = async (e) => {
    e.preventDefault();
    if (rememberMe) {
      Cookies.set('email', email, { expires: 7 }); 
      Cookies.set('password', password, { expires: 7 }); 
      Cookies.set('rememberMe', rememberMe, { expires: 7 }); 
      console.log("yes");
    } else {
      Cookies.remove('email');
      Cookies.remove('password');
      Cookies.remove('rememberMe');
    }
    if (loading) return; 

    setLoading(true); 

    axios
      .post(
        "https://chat-prod-dvbe.onrender.com/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          toast.success("Successfully Login");
          Cookies.set("jwt", res.data.token);

          setTimeout(() => {
            window.location.href = "/Chat";
          }, 3000);
        } else {
          Cookies.remove("jwt", res.data.token);
        }
      })
      .catch((error) => {
        localStorage.removeItem("user");
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
          justifyContent: "center",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {windowWidth >= 600 && (
          <div style={{ width: "50%", alignItems: "center" }}>
            <img src={img} alt="" style={{ width: "90%", height: "100%" }} />
          </div>
        )}
        <div style={{ width: "330px" }}>
          <h1 style={{ color: "rgb(34, 34, 34)", marginBottom: "30px" }}>
            welcome to login
          </h1>
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
          <TextField
            id="outlined-basic"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="password "
            required
            type="password"
            variant="outlined"
            size="small"
            style={{ display: "block", marginBottom: "5%" }}
          />
          <div
            style={{
              display: "flex",
              width: "330px",
              color: "#78aaa1",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={<Checkbox  checked={rememberMe} onChange={handleCheckboxChange} />}
              label="Remember Me"
            />
            <p>
              <Link
                to={"/Forgetpassword"}
                style={{ textDecoration: "none", color: "#78aaa1" }}
              >
                Forget Password ?
              </Link>
            </p>
          </div>
          <Button
            variant="outlined"
            type="submit"
            onClick={setData}
            className="btn"
            style={{ borderRadius: "5px", position: "relative" }}
            disabled={loading} 
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>
          <div
            style={{
              display: "flex",
              width: "330px",
              justifyContent: "center",
              alignItems: "center",
              opacity: "0.7",
            }}
          >
            <hr style={{ width: "34%", height: "1px" }} />
            <p>OR Login With</p>
            <hr style={{ width: "34%", height: "1px" }} />
          </div>
          <div
            style={{
              display: "flex",
              width: "330px",
              marginBottom: "30px",
              justifyContent: "space-around",
              opacity: "0.9",
              alignItems: "center",
            }}
          >
            <img src={google} alt="" style={{ width: "50px" }} />
            <img src={facebook} alt="" style={{ width: "50px" }} />
          </div>
          <p style={{ fontSize: "20px", textAlign: "center", width: "330px" }}>
            <span style={{ opacity: "0.8" }}>Don't have an account?</span>
            <Link
              to={"/Signup"}
              style={{ color: " #78aaa1 ", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </p>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Login;
