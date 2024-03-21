import { Button } from "@mui/material";
import img from "../assets/Work chat-bro.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function Home (){
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
return (
    <>
      <div
        style={{
          marginInline: "5%",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexDirection: windowWidth > 900 ? "row" : "column",
          alignItems: "center",
        }}
      >      
        <div style={{ width: "50%", alignItems: "center" }}>
          <img src={img} alt="" style={{ width: "90%", height: "100%" }} />
        </div>
        <div style={{ width: "330px",textAlign: "center" }}>
            <h1 style={{color:"#78aaa1",textAlign: "start"}}>Chatsphere</h1>
            <h4 style={{opacity:"0.6",textAlign: "start"}}>The chat app allows users to message each other, whether in-person or online, with an intuitive interface for text, photo sharing, enhancing communication and interaction..</h4>
          <Link  to={"/Signup"}>
          <Button
            variant="outlined"
            type="submit"
            className="btn"
            style={{ borderRadius: "5px", width: "60%" }}
          >  
          start   
          </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
