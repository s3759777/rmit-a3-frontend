import React, { Component, Fragment } from "react";
import { Route, Link } from "react-router-dom";
import useStyles, { theme } from "../App";

import clsx from "clsx";
import { Card, makeStyles } from "@material-ui/core";
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
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import classes from "../App";
import Title from "./Title";

import Layout from "../Layout";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Button } from "@material-ui/core";

import { useRoutes, A } from "hookrouter";

export default class Dashboard extends React.Component {
  render() {
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <div>
        <Layout title="Dashboard" className="container-fluid">
          <main className={classes.layout}>
            <div className={classes.appBarSpacer} />

            <Grid container spacing={3}>
              <Grid item xs={12} lg={12} style={{ borderBlockColor: "black" }}>
                <Card className={fixedHeightPaper}>
                  <div>
                    <Typography component="h2" variant="h2" gutterBottom>
                      Start a new project
                    </Typography>
                  </div>
                  <p></p>
                  <p></p>
                  <p></p><Grid align="left" lg={8}>
                    <p><Link to="/projectList/new">
                      <Button variant="contained" color="primary">
                        Create new Project
                      </Button>
                    </Link>
                    <Link to="/projectList">
                      <Button color="primary">
                        Explore Existing Projects
                      </Button>
                    </Link></p>

                    <p><Link to="/studentList/new">
                      <Button variant="contained" color="primary">Add new student</Button>
                    </Link>
                    <Link to="/studentList" style={{ color: "#455a64" }}>
                      <Button color="primary">Browse student list</Button>
                    </Link></p>

                    <p><Link to="/assignmentList/new" style={{ color: "#455a64" }}>
                      <Button variant="contained" color="primary">Create new assignment</Button>
                    </Link>
                    <Link to="/assignmentList" style={{ color: "#7cc2fd" }}>
                      {" "}
                      <Button color="primary">Browse assignments</Button>
                    </Link></p>

                    <p><Link to="/courseList/new" style={{ color: "#455a64" }}>
                      <Button variant="contained" color="primary">Add new course</Button>
                    </Link>
                    <Link to="/courses" style={{ color: "#455a64" }}>
                      {" "}
                      <Button color="primary">Explore available courses</Button>
                    </Link></p>
                  </Grid>
                  <Grid align="right" lg="auto">
                    <img
                      src="https://www.titino.eu/joomla/images/innovation-Project.png"
                      style={{ width: "auto", height: "300px" }}
                    />
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </main>
        </Layout>
      </div>
    );
  }
}
