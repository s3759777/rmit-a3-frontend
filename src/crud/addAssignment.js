import React, { useState, Fragment, Component, useEffect } from "react";
import { Link } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import { useRoutes, A } from "hookrouter";
import CssBaseline from "@material-ui/core/CssBaseline";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Slider from "@material-ui/core/Slider";
import Layout from "../Layout"
import useStyles from "../useStyles";

const url = "http://localhost:9000/assignments";

  function AddAssignment() {
    const [Assignments, setAssignments] = useState([]);
    const [assignmentDescription, setAssignmentDescription] = useState("");
    const [assignmentName, setAssignmentName] = useState("");
    const [assignmentPercentage, setAssignmentPercentage] = useState("");
    const [isSent, setIsSent] = useState(false);

    const classes = useStyles();


    const submit = e => {
      e.preventDefault();
      fetch(url, {
        method: "POST",
        headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'},
        body: JSON.stringify({ assignmentName: assignmentName, assignmentDescription: assignmentDescription, assignmentPercentage: assignmentPercentage })
      })
      .then(res => res.json())
      .then(() => setIsSent(true))
      .catch(() => alert("There was an error, please try again"))
    };

    const afterMessage = <Layout
        title="Add Assignment"
        className="container-fluid"
    >
      <React.Fragment>
        <Grid>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
            <Grid align="left">
                <Link to="/assignmentList">
                  <Button color="primary" className={classes.button}>
                    Back
                  </Button>
                </Link>
              </Grid>
              <p></p>
              <p>
        <Typography align="center" variant="h5" gutterBottom>
          Student added.
        </Typography></p>
        <Typography align="center" variant="subtitle1">
          The assignments has been updated to the database.
        </Typography>
        </Paper>
        </main>
        </Grid>
      </React.Fragment></Layout>


    const form = <Layout
        title="Add Assignment"
        className="container-fluid"
    >
    <React.Fragment>
        <Grid>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Grid align="left">
                <Link to="/assignmentList">
                  <Button color="primary" className={classes.button}>
                    Back
                  </Button>
                </Link>
              </Grid>
              <Typography component="h1" variant="h4" align="center">
                Add assignment
              </Typography>

              <p></p>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={9} spacing={3} >
                  <TextField
                    onInvalid
                    required
                    id="assignmentName"
                    name="assignmentName"
                    label="Name"
                    fullWidth
                    autoComplete="assignmentName"
                    value={assignmentName}
                    onChange={e => setAssignmentName(e.target.value)}
                  />
                </Grid>

                              <Grid item xs={12} lg={3} spacing={3} >
                                <TextField
                                  onInvalid
                                  required type="number"
                                  id="assignmentPercentage"
                                  name="assignmentPercentage"
                                  label="Percentage (%)"  InputProps={{ inputProps: { min: 0, max: 100 } }}
                                  fullWidth
                                  autoComplete="assignmentPercentage"
                                  value={assignmentPercentage}
                                  onChange={e => setAssignmentPercentage(e.target.value)}
                                />
                              </Grid>




                <Grid item xs={12}>
                  <TextField
                    required
                    id="assignmentDescription"
                    name="assignmentDescription"
                    label="Description"
                    fullWidth
                    autoComplete="assignmentDescription"
                    value={assignmentDescription}
                    onChange={e => setAssignmentDescription(e.target.value)}
                    multiline

                  />
                </Grid>
              </Grid>

              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={submit}
                  disabled={ !assignmentName  ? true : false}>
                  Confirm
                </Button>
              </div>
            </Paper>
          </main>
        </Grid>
      </React.Fragment></Layout>



  if (isSent) return  afterMessage;
  else return form;
}

export default AddAssignment;
