import * as React from 'react';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function AnchorTemporaryDrawer() {
    const [state, setState] = useState({});
    const [user, setUser] = useState({});
    const token = Cookies.get("jwt");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://chat-prod-dvbe.onrender.com/api/v1/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(res.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [token]);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Stack
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
            style={{ backgroundColor: "#f0f2f5", position: "relative" }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Stack sx={{ top: "0px", height: "50px", display: "flex", backgroundColor: "#78aaa1", justifyContent: "space-between", paddingBottom: "10px", alignItems: "center", flexDirection: "row", position: "absolute", width: "100%", color: "#fff" }}>
                <ArrowBackIcon style={{ marginInline: "30px", cursor: "pointer" }} onClick={toggleDrawer(anchor, false)} />
                <Typography sx={{ fontSize: "1.2rem", fontWeight: "500", letterSpacing: "0.5px" }}>
                    Profile
                </Typography>
                <Typography >
                    <Link to="/updateprofile">
                        <EditIcon style={{ fontSize: 30, color: 'white' }} />
                    </Link>
                </Typography>
            </Stack>
            <Avatar
                alt="Remy Sharp"
                src={user.photo}
                sx={{ width: 220, height: 220, position: "absolute", top: "80px", left: "50px" }}
            />
            <Stack padding={"10px 0px 0px 30px"} sx={{ height: "100px ", width: " 100%", position: "absolute", top: "300px" }}>
                <Typography >
                    <Typography color={"#78aaa1"} fontSize={"25px"}>
                        Your name
                    </Typography>
                    <Typography marginTop={"15px"}>
                        {user.name}
                    </Typography>
                </Typography>
            </Stack>
            <Stack sx={{ height: "100px ", width: "100%", position: "absolute", top: "370px" }}>
                <Typography padding={"20px 20px 20px 25px"}>
                    <Typography color={"gray"} fontSize={"16px"} >
                        This is not username or pin. This name will be visible to your WhatsApp contacts.
                    </Typography>
                </Typography>
            </Stack>
            <Stack padding={"10px 0px 0px 30px"} sx={{ height: "100px ", width: " 91.5%", position: "absolute", top: "440px" }}>
                <Typography >
                    <Typography color={"#78aaa1"} fontSize={"25px"}>
                        About
                    </Typography>
                    <Typography marginTop={"15px"}>
                        {user.email}
                    </Typography>
                </Typography>
            </Stack>
        </Stack>
    );

    return (
        <div>
            <Button onClick={toggleDrawer("left", true)}>
                <Avatar
                    alt="Remy Sharp"
                    src={user.photo}
                    style={{ width: "40px", height: "40px", left: "20px" }}
                />
            </Button>
            <Drawer
                anchor="left"
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {list("left")}
            </Drawer>
            <ToastContainer/>
        </div>
    );
}
