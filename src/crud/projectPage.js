import React, { useState, useEffect, useMatchParams } from "react";
import { useParams, Link  } from "react-router-dom";
import Projects from "../components/projects";
import useStyles from "../useStyles";
import { Grid, Paper, Typography, Button, Table, TableCell, TableRow, Divider } from "@material-ui/core"
import { A } from "hookrouter"
import Layout from "../Layout"
import axios from "axios";

const url = "https://serene-lowlands-53583.herokuapp.com/projects/";



export default function ProjectPage( props ) {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
    const [students, setStudents] = useState([]);
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
   const [description, setDescription] = useState("");
    const [technologyUsed, setTechnologyUsed] = useState("");
    const [scope, setScope] = useState("");
        const [application, setApplication] = useState(true);



  const [isLoading, setIsLoading] = useState(true);

  const {pId} = props.match.params.id;


    useEffect(() => {
        fetch(url + props.match.params.id, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(res => res.json())
        .then(response => {
            setProjects(response);
            setStudents(response.students);
            setIsLoading(false);
        })
        .catch(() => alert("There was an error, please try again"));
  }, []);

  return (
    <div><Layout
        title="Details"
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
                    <Table>
                    <TableRow hover tabIndex={-1}><Typography align="left" variant="h5" gutterBottom>
                 {projects.name}
              </Typography></TableRow>
              <TableRow hover tabIndex={-1}><Typography align="left" variant="subtitle1"><Divider />
                <strong>Assignment:</strong> {projects.assignment}
              </Typography></TableRow><Divider />
              <TableRow hover tabIndex={-1}><Typography align="left" variant="subtitle1"><Divider />
                <strong>Course:</strong> {projects.course}
              </Typography></TableRow><Divider />
              <TableRow hover tabIndex={-1}><Typography align="left" variant="subtitle1"><Divider />
                <strong>Link to Industry:</strong> {projects.company}
              </Typography></TableRow><Divider />
              <TableRow hover tabIndex={-1}><Typography align="left" variant="subtitle1"><Divider />
                <strong>Technology used:</strong> {projects.technologyUsed}
              </Typography></TableRow><Divider />
              <TableRow hover tabIndex={-1}><Typography align="left" variant="subtitle1"><Divider />
                <strong>Application:</strong> {projects.application === 'yes' ? "In real life" : "Not in real life"}
              </Typography></TableRow><Divider />
              <TableRow hover tabIndex={-1}><Typography align="left" variant="subtitle1"><Divider />
                <strong>Scope:</strong> {projects.scope}
              </Typography></TableRow><Divider />
              <TableRow hover tabIndex={-1}><Typography align="left" variant="subtitle1">
                <strong>Description:</strong> {projects.description}
              </Typography></TableRow><Divider />
              <TableRow hover tabIndex={-1}><Typography align="left" variant="subtitle1">
                <strong>Team members:</strong> {students.map(item => (<ul  key={students}>{students}</ul>))}
              </Typography></TableRow>
              </Table>
              </Paper>
              </main>
              </Grid>
            </React.Fragment></Layout>
    </div>
  );
}
