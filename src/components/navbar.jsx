import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AnchorTemporaryDrawer from './UserProfile';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const drawerWidth = 240;
export default function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
    const handleLogout = () => {
      axios.get('https://chat-prod-dvbe.onrender.com/api/v1/auth/logout').then((res)=>{
        localStorage.removeItem('user');
        Cookies.remove('jwt',res.data.token);
        Cookies.remove('email');
        Cookies.remove('password');
        Cookies.remove('rememberMe');
        navigate('/login');
      }).catch((error)=>{
        toast.error(error)
      })
     
    }
    const navItems = [
      { icon:  <AnchorTemporaryDrawer/>, key: 'profile' },
      { icon: <LogoutOutlinedIcon fontSize="large" onClick={handleLogout}/>, key: 'logout' }
    ];
  const drawer = (
    <Box onClick={handleDrawerToggle} Style={{ textAlign: 'center'}}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Logo
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.icon} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>  
    </Box>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#78aaa1' , width:"30%", left:"0", boxShadow:"0" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Logo
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.key} sx={{ color: '#fff' }}>
                {item.icon}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#78aaa1', color: 'white' },
          }}
        >
          {drawer}
        </Drawer>
        <ToastContainer/>
      </nav>
    </Box>
  );
}