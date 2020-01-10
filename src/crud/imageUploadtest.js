import React, { useState, Fragment, Component, useEffect } from "react";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import { useRoutes, A } from "hookrouter";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Paper, Button, Grid, TextField, Checkbox, InputLabel, MenuItem, FormHelperTex, FormControl, Select, Radio, RadioGroup, FormControlLabel,
FormLabel, Typography, IconButton } from "@material-ui/core";

import PhotoCamera from "@material-ui/icons/PhotoCamera";

import axios from 'axios';

import useStyles from "../useStyles";
import FileUpload, { Message, Progress } from "./FileUpload";

import PropTypes from 'prop-types';

const url = "http://localhost:9000/students";







export default function ImageUpload() {
  const [projects, setProjects] = useState([]);

  const [projectID, setProjectID] = useState(""); //project ID
  const [projectName, setProjectName] = useState(""); // project name

//from other databases
//assignment
  const [assignmentName, setAssignmentName] = useState("");
//student
  const [students, setStudents] = useState([{
      studentName: "",
      studentID: "",
  }]);
//course
  const [course, setCourse] = useState({
      courseName: "",
      courseID: "",
  });

//original
  const [semester, setSemester] = useState("");
  const [tech, setTech] = useState("");
  const [link, setLink] = useState("");
  const [scope, setScope] = useState("");
  const [description, setDescription] = useState("");
  const [application, setApplication] = useState("");

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
      body: JSON.stringify({
        projectName: projectName,
        projectID: projectID,
        assignmentName: assignmentName,
        students: students,
        course: course,
        description: description,
        link: link,
        tech: tech,
        scope: scope,
        application: application,
       })
    })
      .then(res => res.json())
      .then(() => setIsSent(true))
      .catch(() => alert("There was an error, please try again"));
  };

  const afterMessage = (
    <React.Fragment>
      <Grid>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid align="left">
              <A href="/projects">
                <Button color="primary" className={classes.button}>
                  Back
                </Button>
              </A>
            </Grid>
            <p></p>
            <p>
              <Typography align="center" variant="h4" gutterBottom>
                Project created.
              </Typography>
            </p>
            <Typography align="center" variant="subtitle1">
              The project has been updated to the database.
            </Typography>
          </Paper>
        </main>
      </Grid>
    </React.Fragment>
  );

  const form = (
    <React.Fragment>
      <Grid>
        <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Grid align="left">
              <A href="/assignments">
                <Button color="primary" className={classes.button}>
                  Back
                </Button>
              </A>
            </Grid>
            <p></p>

            <p></p>
            <Typography component="h1" variant="h4" align="left">
              Create project
              <p></p>
              <p></p>
              <p></p>
            </Typography>

            <p></p>
            <Grid container spacing={3}>
              <Grid item xs={12} align="left">
                {/*<input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="outlined" color="primary" component="span">
                    Upload Image{" "}
                    <IconButton
                      color="primary"
                      size="small"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </Button>
                </label>*/}

                <FileUpload />

              </Grid>
              <Grid item xs={12} sm={7} lg={7}>
                <Typography variant="h5">Project name</Typography>
                <p></p>
                <TextField
                  onInvalid
                  variant="outlined"
                  color="primary"
                  required
                  id="projectName"
                  name="projectName"
                  label="Project name"
                  fullWidth
                  autoComplete="name"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={5} lg={5}>
                <Typography variant="h5">Project ID</Typography>
                <p></p>
                <TextField
                  required
                  variant="outlined"
                  color="primary"
                  id="projectID"
                  name="projectId"
                  label="Project ID"
                  fullWidth
                  autoComplete="projectID"
                  value={projectID}
                  onChange={e => setProjectID(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={12}>
                <Typography variant="h5">Assignment</Typography>
                <p></p>
                <Select
                  onChange={e => setAssignmentName(e.target.value)}
                  id="assignmentName"
                  variant="outlined"
                  color="primary"
                  FormHelperText="Ok"
                  fullWidth
                >
                  <MenuItem disabled value="">
                    <em>Choose assignment</em>
                  </MenuItem>
                  <MenuItem value={assignmentName}>{assignmentName}</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={12} lg={12}>
                <Typography variant="h5">Course</Typography>
                <p></p>
                <Select
                  variant="outlined"
                  color="primary"
                  onChange={e => setCourse(e.target.value)}
                  id="courseName"
                  fullWidth
                >
                  <MenuItem disabled value="">
                    <em>Choose course</em>
                  </MenuItem>
                  <MenuItem value={course.courseName}>{course.courseName}</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={12} lg={12}>
                <Typography variant="h5">Semester</Typography>
                <p></p>
                <TextField
                  variant="outlined"
                  color="primary"
                  id="semester"
                  name="semester"
                  label="Semester"
                  fullWidth
                  autoComplete="semester"
                  value={semester}
                  onChange={e => setSemester(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={12}>
                <Typography variant="h5">Technology use</Typography>
                <p></p>
                <TextField
                  id="tech"
                  name="Technology"
                  label="Technology to be used in this project"
                  fullWidth
                  autoComplete="technology"
                  value={tech}
                  variant="outlined"
                  color="primary"
                  onChange={e => setTech(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <Typography variant="h5">Scope</Typography>
                <p></p>
                <TextField
                  id="scope"
                  name="Scope"
                  label="Define project scope"
                  fullWidth
                  autoComplete="scope"
                  value={scope}
                  variant="outlined"
                  color="primary"
                  onChange={e => setScope(e.target.value)}
                />
              </Grid>


                            <Grid item xs={12} sm={12} lg={12}>
                              <Typography variant="h5">Application</Typography><p></p>
                              <Typography variant="subtitle3">Applied in real life or not?</Typography>

                              <RadioGroup
                                aria-label="Application"
                                name="application"
                                value={application}
                                onChange={e => setApplication(e.target.value)}
                              ><FormControlLabel value="yes" label="Yes"control={<Radio color="primary" />} label="Yes" />
                              <FormControlLabel value="no" label="No"control={<Radio color="primary" />} label="No" />
                              </RadioGroup>

                            </Grid>

              <Grid item xs={12} sm={12} lg={12}>
                <Typography variant="h5">Link to Industry</Typography>
                <p></p>
                <TextField
                  id="link"
                  name="Link"
                  label="e.g: https://examplepage.com/"
                  fullWidth
                  autoComplete="link"
                  value={link}
                  variant="outlined"
                  color="primary"
                  onChange={e => setLink(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Description</Typography>
                <p></p>
                <TextField
                  id="description"
                  name="description"
                  label="Enter description"
                  fullWidth
                  autoComplete="description"
                  value={description}
                  variant="outlined"
                  color="primary"
                  onChange={e => setDescription(e.target.value)}
                  multiline
                  rows="8"
                />
              </Grid>
            </Grid>

            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={submit}
                disabled={!projectName || !projectID   ? true : false}
              >
                Confirm
              </Button>
            </div>
          </Paper>
        </main>
      </Grid>
    </React.Fragment>
  );

  if (isSent) return afterMessage;
  else return form;
}
