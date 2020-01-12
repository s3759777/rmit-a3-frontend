import React, { useState, Fragment, Component, useEffect } from "react";
import { Link } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import axios from "axios";

import { useRoutes, A } from "hookrouter";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Paper, Button, Grid, TextField, Checkbox, InputLabel, MenuItem, FormHelperTex, FormControl, Select, Radio, RadioGroup, FormControlLabel,
FormLabel, Typography, IconButton } from "@material-ui/core";

import PhotoCamera from "@material-ui/icons/PhotoCamera";
import FileUpload, { Message, Progress } from "./FileUpload";
import Layout from "../Layout"

import useStyles from "../useStyles";

const url = "https://serene-lowlands-53583.herokuapp.com/students";

function AddProject() {
  const [projects, setProjects] = useState([]);
  const [photo, setPhoto] = useState('')
  const [filename, setFileName] = useState('Choose File');
  const [name, setName] = useState(""); // project name

//from other databases
//assignment
  const [assignments, setAssignments] = useState([]);
    const [assignment, setAssignment] = useState("");
//student
  const [studentList, setstudentList] = useState([]);
    const [student, setStudent] = useState("");
 const [students, setstudents] = useState([]);
//course
  const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState("");

//original
  const [semester, setSemester] = useState("");
  const [technologyUsed, setTech] = useState("");
  const [company, setCompany] = useState("");
  const [scope, setScope] = useState("");
  const [description, setDescription] = useState("");
  const [application, setApplication] = useState("");

  const [isSent, setIsSent] = useState(false);

  const classes = useStyles();

  const url = "http://localhost:9000/projects";
  const urlAssignment = "http://localhost:9000/assignments";
  const urlCourse = "http://localhost:9000/courses";
  const urlStudents = "http://localhost:9000/students";

  const onChange = e => {
    setPhoto(e.target.files[0]);
  };

  const submit = e => {
    e.preventDefault();

    let formData = new FormData();    //formdata object

    formData.append('name', name);   //append the values with key, value pair
    formData.append('description', description);
    formData.append('company', company);
    formData.append('technologyUsed', technologyUsed);
    formData.append('scope', scope);
    formData.append('course', course);
    formData.append('application', application);
    formData.append('assignment', assignment);
    formData.append('semester', semester);

    formData.append('students', students);

    formData.append('photo', photo);

    const config = {
    headers: { 'content-type': 'multipart/form-data' }
}

    axios.post(url, formData, config)
    .then(() => setIsSent(true))


    {/*fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json"
      },
      body: {
        name: name,
        description: description,
        company: company,
        technologyUsed: technologyUsed,
        scope: scope,
        application: application,
        course: course,
        assignment: assignment,
        semester: semester
       }
    })
      .then(res => res.json())
      .then(() => setIsSent(true))
      .catch(() => alert("There was an error, please try again"));
      */}
  };


useEffect(() => {
    (async () => {

      const courseResult = await axios(urlCourse);
      setCourses(courseResult.data);
      const assignmentResult = await axios(urlAssignment);
      setAssignments(assignmentResult.data);
      const studentResult = await axios(urlStudents);
      setstudentList(studentResult.data);

    })();
  }, []);


  const afterMessage = (<Layout
      title="Add Project"
      className="container-fluid"
  >
    <React.Fragment>
      <Grid>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid align="left">
              <Link to="/projectList">
                <Button color="primary" className={classes.button}>
                  Back
                </Button>
              </Link>
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
    </React.Fragment></Layout>
  );

  const form = (<Layout
      title="Add Project"
      className="container-fluid"
  >
    <React.Fragment>
      <Grid>
        <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Grid align="left">
              <Link to="/projectList">
                <Button color="primary" className={classes.button}>
                  Back
                </Button>
              </Link>
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
             <Button variant="outlined" color="primary" component="span">
                     <input
                type='file'
                id='customFile'   accept="image/*"
                onChange={e => {setPhoto(e.target.files[0])}}
              /> <PhotoCamera /></Button>

              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <Typography variant="h5">Project name</Typography>
                <p></p>
                <TextField
                  onInvalid
                  variant="outlined"
                  color="primary"
                  required
                  id="name"
                  name="name"
                  label="Project name"
                  fullWidth
                  autoComplete="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>


         <Grid item xs={12} sm={12} lg={12}>
                <Typography variant="h5">Assignment</Typography>
                <p></p>
                <select
                  onChange={e => setAssignment(e.target.value)}
                  id="course" style={{ width: "100%", height: "50px"}}
                  fullWidth
                >

                  {assignments.map(item => (<option value={assignments.Name}>{item.assignmentName}</option>))}
                </select>
              </Grid>

              <Grid item xs={12} sm={12} lg={12}>
                <Typography variant="h5">Course</Typography>
                <p></p>


                <select
                  onChange={e => setCourse(e.target.value)}
                  id="course" style={{ width: "100%", height: "50px"}}
                  fullWidth
                >

                  {courses.map(item => (<option value={courses.Name}>{item.courseName}</option>))}
                </select>
              </Grid>




              <Grid item xs={12} sm={12} lg={12}>
             <Typography variant="h5">Team members</Typography>
            <p></p>
            <Grid lg={3}>Member 1</Grid>
                <select
                  onChange={e => students.push(e.target.value)}
                  id="course" style={{ width: "100%", height: "50px"}}
                  fullWidth
                >

                  {studentList.map(item => (<option value={studentList.studentName}>{item.studentName} (Student ID: {item.studentID})</option>))}
                </select>

                <p></p>
                <Grid lg={3}>Member 2</Grid>
                <select
                  onChange={e => students.push(e.target.value)}
                  id="course" style={{ width: "100%", height: "50px"}}
                  fullWidth
                >

                  {studentList.map(item => (<option value={studentList.studentName}>{item.studentName} (Student ID: {item.studentID})</option>))}
                </select>
                <p></p>
                <Grid lg={3}>Member 3</Grid>
                <select
                  onChange={e => students.push(e.target.value)}
                  id="course" style={{ width: "100%", height: "50px"}}
                  fullWidth
                >

                  {studentList.map(item => (<option value={studentList.studentName}>{item.studentName} (Student ID: {item.studentID})</option>))}
                </select>
                <p></p>
                <Grid lg={3}>Member 4</Grid>

                <select
                  onChange={e => students.push(e.target.value)}
                  id="course" style={{ width: "100%", height: "50px"}}
                  fullWidth
                >

                  {studentList.map(item => (<option value={studentList.studentName}>{item.studentName} (Student ID: {item.studentID})</option>))}
                </select>

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
                  id="technologyUsed"
                  name="Technology"
                  label="Technology to be used in this project"
                  fullWidth
                  autoComplete="technology"
                  value={technologyUsed}
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
                  id="company"
                  name="Company"
                  label="e.g: https://examplepage.com/"
                  fullWidth
                  autoComplete="company"
                  value={company}
                  variant="outlined"
                  color="primary"
                  onChange={e => setCompany(e.target.value)}
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
                disabled={!name   ? true : false}
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

export default AddProject;
