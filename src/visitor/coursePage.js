import React, { useState, useEffect, useMatchParams } from "react";
import { useParams, Link } from "react-router-dom";
import Courses from "../components/courses";
import useStyles from "../useStyles";
import { Grid, Paper, Typography, Button, Table, TableCell, TableRow, Divider } from "@material-ui/core"
import { A } from "hookrouter"
import axios from "axios";
import LayoutVisitor from "./LayoutVisitor"

const url = "http://localhost:9000/courses/";



export default function ViewCoursePage( props ) {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const [courseID, setCourseID] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const {cId} = props;


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
            setCourses(response);
            setIsLoading(false);
        })
        .catch(() => alert("There was an error, please try again"));
  }, []);

  return (
    <div>
    <LayoutVisitor
        title="Details"

        className="container-fluid"
    >
              <React.Fragment>
              <Grid>
              <main className={classes.layout}>
                  <Paper className={classes.paper}>
                  <Grid align="left">
                      <Link to="/visitor/courses">
                        <Button color="primary" className={classes.button}>
                          Back
                        </Button>
                      </Link>
                    </Grid>
                    <p></p>
                    <Table>
                    <TableRow hover tabIndex={-1}><Typography align="left" variant="h6" gutterBottom>
                 {courses.courseName}
              </Typography></TableRow>
              <TableRow hover tabIndex={-1}><Typography align="left" variant="subtitle1"><Divider />
                Course ID: {courses.courseID}
              </Typography></TableRow><Divider />

              </Table>
              </Paper>
              </main>
              </Grid>
            </React.Fragment></LayoutVisitor>
    </div>
  );
}
