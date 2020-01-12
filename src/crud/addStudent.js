import React, { useState, Fragment, Component, useEffect } from "react";
import { Link } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import { useRoutes, A } from "hookrouter";
import CssBaseline from "@material-ui/core/CssBaseline";

import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";


import useStyles from "../useStyles";

import Layout from "../Layout"

const url = "https://serene-lowlands-53583.herokuapp.com/students";

function AddStudent() {
  const [students, setStudents] = useState([]);
  const [studentID, setstudentID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentYear, setStudentYear] = useState("");
  const [isSent, setIsSent] = useState(false);

  const classes = useStyles();


  const submit = e => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'},
      body: JSON.stringify({ studentName: studentName, studentID: studentID, studentYear: studentYear })
    })
    .then(res => res.json())
    .then(() => setIsSent(true))
    .catch(() => alert("There was an error, please try again"))
  };

  const afterMessage = <Layout
      title="Add Student"
      className="container-fluid"
  >
    <React.Fragment>
      <Grid>
      <main className={classes.layout}>
          <Paper className={classes.paper}>
          <Grid align="left">
              <Link to="/studentList">
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
        The student has been updated to the database.
      </Typography>
      </Paper>
      </main>
      </Grid>
    </React.Fragment></Layout>


  const form =<Layout
      title="Add Student"
      className="container-fluid"
  >
  <React.Fragment>
      <Grid>
      <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid align="left">
              <Link to="/studentList">
                <Button color="primary" className={classes.button}>
                  Back
                </Button>
              </Link>
            </Grid>
            <Typography component="h1" variant="h4" align="center">
              Add a student
            </Typography>

            <p></p>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                onInvalid
                  required
                  id="studentName"
                  name="studentName"
                  label="Full name"
                  fullWidth
                  autoComplete="studentName"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={7} lg={7}>
                <TextField
                  required
                  id="studentID"
                  name="studentId"
                  label="Student ID"
                  fullWidth
                  autoComplete="studentID"
                  value={studentID}
                  onChange={e => setstudentID(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={5} lg={5}>
                <TextField
                  required
                  id="studentYear"
                  name="Year"
                  label="Year"
                  type="number"
                  fullWidth
                  inputProps={{ min: 1, max: 5 }}
                  autoComplete="studentYear"
                  value={studentYear}
                  onChange={e => setStudentYear(e.target.value)}
                />
              </Grid>
            </Grid>

            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={submit}
                disabled={ !studentName || !studentID  ? true : false}>
                Confirm
              </Button>
            </div>
          </Paper>
        </main>
      </Grid>
    </React.Fragment></Layout>


   if(isSent)
   return afterMessage
   else return form;


}



export default AddStudent;
