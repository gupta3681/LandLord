import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { deepOrange } from '@material-ui/core/colors';
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#F7F7F7', // Light gray for main background
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#2E2E2E', // Dark gray for AppBar
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    backgroundColor: '#2E2E2E', // Dark gray for left menu bar
    color: '#FFFFFF', // White text for better contrast against dark background
  },
  drawerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Adjust the content to be between top and bottom
    height: '100%', // Take the full height of the parent container
    marginTop: 64, // Leave space for the app bar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#F7F7F7', // Light gray for main content background
  },
  avatar: {
    marginLeft: 'auto',
  },
  logoutButton: {
    backgroundColor: deepOrange[500], // Using a subtle accent color for the Logout button
    '&:hover': {
      backgroundColor: deepOrange[700],
    },
    marginBottom: 16,
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="regular" >
          <IconButton edge="start" color="primary" aria-label="menu">
            {/* Add menu icon here */}
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome, {name}
          </Typography>
          <Avatar className={classes.avatar}>A</Avatar>
        </Toolbar>
      </AppBar>
      <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {/* Add your menu items here */}
          <ListItem button>
            <ListItemIcon>
              {/* Add your icons here */}
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              {/* Add your icons here */}
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              {/* Add your icons here */}
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>

        </List>
          <Button
          variant="contained"
          className={classes.logoutButton}
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </Drawer>
      <main className={classes.content}>
        <Toolbar />
        
          <Paper style={{ padding: 16 }}>
            <Typography variant="h5" component="h1" gutterBottom>
              Welcome to your dashboard
            </Typography>
            <Typography variant="body1" gutterBottom>
              This is a protected page
            </Typography>
          </Paper>
  
      </main>
    </div>
  );
}

export default Dashboard;
