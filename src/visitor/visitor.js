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


import LayoutVisitor from "./LayoutVisitor"

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Button } from "@material-ui/core";

import { useRoutes, A } from "hookrouter";

export default class VisitorDashboard extends React.Component {
  render() {
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <LayoutVisitor
            title="Home"
            
            className="container-fluid"
        >
      <div>
<main className={classes.layout}>
          <div className={classes.appBarSpacer} />

            <Grid container spacing={3}>

              <Grid item xs={12}  lg={12} style={{ borderBlockColor: "black"}} >
                <Card className={fixedHeightPaper} >
                  <div ><Typography component="h2" variant="h2"   gutterBottom >Explore our projects</Typography></div><p></p><p></p>
                  <Grid align="left"  lg={8}>

                  <p><Link to="/visitor/projects" ><Button className={classes.buttons} variant="contained" color="primary" >Browse Projects</Button></Link></p>
                  <p><Link to="/visitor/students" style={{ color: "#455a64" }}><Button variant="contained" color="primary">Browse student list</Button></Link></p>
                  <p><Link to="/visitor/assignments" style={{ color: "#7cc2fd" }}>  <Button variant="contained"color="primary">Browse assignments</Button></Link></p>
                  <p><Link to="/visitor/courses" style={{ color: "#455a64" }}> <Button variant="contained" color="primary">Browse courses</Button></Link></p>
                  </Grid>
<Grid align="right"  lg="auto">
                  <img src="https://www.titino.eu/joomla/images/innovation-Project.png" style={{  width: "auto", height: "300px" }}/>
</Grid>


                </Card>
              </Grid>


            </Grid>
</main>

      </div></LayoutVisitor>
    );
  }
}
