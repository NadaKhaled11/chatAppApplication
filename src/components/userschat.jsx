import React, { useState, useEffect } from 'react';
import { Grid, Typography, ThemeProvider, Card, TextField, InputAdornment, IconButton } from '@mui/material';
import { css } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from '@mui/icons-material/Search';
import Cookies from 'js-cookie';
import DrawerAppBar from './navbar';
const Users = ({ onUserSelect, me }) => {
    const [value, setValue] = useState("");
    const [users, setUsers] = useState([]);
    const [createChat, setCreateChat] = useState([]);
    useEffect(() => {
        fetchUsers();
    }, []);
    const token = Cookies.get("jwt");
    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://chat-prod-dvbe.onrender.com/api/v1/users/', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setUsers(response.data.data);
        } catch (error) {
            toast.error('Error fetching users: ' + error.message);
        }
    };
    const handleUserClick = async (id) => {
        onUserSelect(id);
        try {
            console.log(id);
            const response = await axios.post('https://chat-prod-dvbe.onrender.com/api/v1/chats/', { receivedId: id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCreateChat([response.data]);
            console.log(response.data);
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Error sending message:', error);
        }
    };
    const chatItemStyle = css`
        background-color: #f0f0f0;
        border-radius: 8px;
        border-bottom: 2px solid #ccc;
    `;
    const cardContentStyle = css`
        display: flex;
        align-items: center;
        padding: 16px;
    `;
    const theme = createTheme();
    return (
        <>
            <DrawerAppBar/>
            <div style={{ marginTop: "70px" }}>
                <TextField
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    label="Search"
                    style={{ margin: '10px', width: "90%" }}
                    size='small'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <ThemeProvider theme={theme}>
                    {
                        (() => {
                            const filteredUsers = users
                                .filter(user => user._id !== me?._id)
                                .filter(user => user.name.toLowerCase().includes(value.toLowerCase()));
                            if (filteredUsers.length === 0) {
                                return (
                                    <Typography variant="body1" component="p">
                                        No users
                                    </Typography>
                                );
                            }
                            return (
                                <Grid container spacing={1} style={{ cursor: "pointer", overflowY: "scroll", maxHeight: "80vh" }}>
                                    {
                                        filteredUsers.map((item) => (
                                            <Grid key={item._id} item xs={12}>
                                                <Card
                                                    css={chatItemStyle}
                                                    style={{ width: "100%" , height:"70px" }}
                                                    onClick={() => handleUserClick(item._id)}
                                                >
                                                    <div css={cardContentStyle}>
                                                        <div style={{ display: 'flex' }}>
                                                            <div style={{ position: "relative" }}>
                                                                <img
                                                                    src={item.photo}
                                                                    alt="Profile"
                                                                    style={{
                                                                        width: '50px',
                                                                        height: '50px',
                                                                        marginRight: '16px',
                                                                        marginBottom: '-20px',
                                                                        marginTop: '10px',
                                                                        borderRadius: '50%',
                                                                    }}
                                                                />
                                                            </div>
                                                            <Typography
                                                                variant="h6"
                                                                component="h3"
                                                                gutterBottom
                                                                style={{ marginTop: '10px', textAlign: 'center' }}
                                                            >
                                                                {item.name}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            );
                        })()
                    }
                    <ToastContainer />
                </ThemeProvider>
            </div>
        </>
    );
};
export default Users;