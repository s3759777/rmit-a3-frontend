import React, { useState, Fragment, Component, useEffect } from "react";
import { Link } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import { useRoutes, A } from "hookrouter";
import CssBaseline from "@material-ui/core/CssBaseline";

import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Layout from "../Layout"
import useStyles from "../useStyles";

const url = "https://serene-lowlands-53583.herokuapp.com/courses";

//change db values:
//name: studentName > courseName //id: studentID > courseID

function AddCourse() {
  const [courses, setCourses] = useState([]);
  const [courseID, setCourseID] = useState("");
  const [courseName, setCourseName] = useState("");

  const [isSent, setIsSent] = useState(false);

  const classes = useStyles();

  const submit = e => {
    e.preventDefault();

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ courseName: courseName, courseID: courseID }) //change param here
    })
      .then(res => res.json())
      .then(() => setIsSent(true))
      .catch(() => alert("There was an error, please try again"));
  };

  const afterMessage = (<Layout
      title="Add Course"
      className="container-fluid"
  >
    <React.Fragment>
      <Grid>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid align="left">
              <Link to="/courseList">
                <Button color="primary" className={classes.button}>
                  Back
                </Button>
              </Link>
            </Grid>
            <p></p>
            <p>
              <Typography align="center" variant="h5" gutterBottom>
                Course added.
              </Typography>
            </p>
            <Typography align="center" variant="subtitle1">
              The course has been updated to the database.
            </Typography>
          </Paper>
        </main>
      </Grid>
    </React.Fragment></Layout>
  );

  const form = (<Layout
      title="Courses"
      className="container-fluid"
  >
    <React.Fragment>
      <Grid>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid align="left">
              <Link to="/courseList">
                <Button color="primary" className={classes.button}>
                  Back
                </Button>
              </Link>
            </Grid>
            <Typography component="h1" variant="h4" align="center">
              Add a course
            </Typography>

            <p></p>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={7} lg={7}>
                <TextField
                  onInvalid
                  required
                  id="courseName"
                  name="courseName"
                  label="Course name"
                  fullWidth
                  autoComplete="name"
                  value={courseName}
                  onChange={e => setCourseName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={5} lg={5}>
                <TextField
                  required
                  id="courseID"
                  name="courseId"
                  label="Course ID"
                  fullWidth
                  autoComplete="courseID"
                  value={courseID}
                  onChange={e => setCourseID(e.target.value)}
                />
              </Grid>
            </Grid>

            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={submit}
                disabled={!courseName || !courseID ? true : false}
              >
                Confirm
              </Button>
            </div>
          </Paper>
        </main>
      </Grid>
    </React.Fragment></Layout>
);

  if (isSent) return afterMessage;
  else return form;
}

export default AddCourse;
