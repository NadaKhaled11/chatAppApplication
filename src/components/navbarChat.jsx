import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from '@mui/icons-material/Delete';
const Navbar = ({ selectedUserId }) => {
    const token = Cookies.get("jwt");
    const [user, setUser] = useState('');
    const handleDeleteClick = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete the conversation?");
        if (isConfirmed) {
            try {
                axios.delete(`https://chat-prod-dvbe.onrender.com/api/v1/chats/${selectedUserId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });      
                toast.success("Delete conversation");
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data:', error);
            }
        }
      };
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`https://chat-prod-dvbe.onrender.com/api/v1/users/${selectedUserId}`, {
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
        if (selectedUserId) {
            getUser();
        }
    }, [selectedUserId, token]);
    return (
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#78aaa1',height:"64.4px" , width:"100%"}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{ position: 'relative' }}>
                    <img src={user.photo} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', backgroundColor: user.isOnline ? 'green' : 'red' }} />
                </div>
                <Typography variant="subtitle1" style={{ margin: "0" }}>{user.name}</Typography>
                </div>
                <div  onClick={handleDeleteClick}>
                <DeleteIcon style={{fontSize:"30px", color:"white"}}/>
        <ToastContainer/>
                </div>          
        </Box>
    ); 
};
export default Navbar