import React, { Component, Fragment } from "react";
import { Switch, BrowserRouter, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "./logo1.png";

import clsx from "clsx";

import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";


import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import LayersIcon from "@material-ui/icons/Layers";
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import BallotIcon from "@material-ui/icons/Ballot";
import EventNoteIcon from "@material-ui/icons/EventNote";


import Dashboard from "./components/dashboard";


import useStyles from "./useStyles";

import { useRoutes, A } from "hookrouter";
import Routes from "./Routes"


class NonExistentPage extends React.Component {
  render() {
    return (
      <div>
        {" "}
        <Typography variant="h1">404</Typography> <Typography variant="h2">Page doesn't exist</Typography>
      </div>
    );
  }
}


function App() {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const routeResult = useRoutes(Routes);


  const [open, setOpen] = React.useState(true);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
        style={{ backgroundColor: "#303f9f", backgroundImage: "url(https://wallpaperboat.com/wp-content/uploads/2019/06/minimalist-desktop-5.jpg)"}}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <Link class="navbar-brand" to="/" target="_blank">
              <img src={logo} height="30" />
            </Link>
            Dashboard
          </Typography>

          <IconButton
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Badge badgeContent={0} color="secondary">
              <AccountCircleIcon />
            </Badge>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <Link to="/" style={{ color: "#455a64" }}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>

            <Link to="/projects" style={{ color: "#455a64" }}>
              <ListItem button>
                <ListItemIcon>
                  <EventNoteIcon />
                </ListItemIcon>
                <ListItemText primary="Projects" />
              </ListItem>
            </Link>
          </div>
        </List>
        <Divider />
        <List>
          <div>

            <Link to="/students" style={{ color: "#455a64" }}>
              <ListItem button>
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItem>
            </Link>

            <Link to="/courses" style={{ color: "#455a64" }}>
              <ListItem button>
                <ListItemIcon>
                  <BallotIcon />
                </ListItemIcon>
                <ListItemText primary="Courses" />
              </ListItem>
            </Link>
            <Link to="/assignments" style={{ color: "#455a64" }}>
              <ListItem button>
                <ListItemIcon>
                  <CollectionsBookmarkIcon />
                </ListItemIcon>
                <ListItemText primary="Assignments" />
              </ListItem>
            </Link>
          </div>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Dashboard />

        </Container>
      </main>
      <div></div>
    </div>
  );
}



export default App;
