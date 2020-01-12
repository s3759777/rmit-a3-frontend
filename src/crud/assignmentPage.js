import React, { useState, useEffect, useMatchParams } from "react";
import { useParams, Link } from "react-router-dom";
import Assignments from "../components/assignments";
import useStyles from "../useStyles";
import { Grid, Paper, Typography, Button, Table, TableCell, TableRow, Divider } from "@material-ui/core"
import { A } from "hookrouter"
import Layout from "../Layout"

export default function AssignmentPage( props ) {
  const classes = useStyles();
  const [assignments, setAssignments] = useState([]);
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentPercentage, setAssignmentPercentage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

    const {aId} = props.match.params.id;

  const url = "https://serene-lowlands-53583.herokuapp.com/assignments/";







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
              setAssignments(response);
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
                      <Link to="/assignmentList">
                        <Button color="primary" className={classes.button}>
                          Back
                        </Button>
                      </Link>
                    </Grid>
                    <p></p>
                    <Table>
                    <TableRow hover tabIndex={-1}><Typography align="left" variant="h6" gutterBottom>
                 {assignments.assignmentName}
              </Typography></TableRow>
              <TableRow hover tabIndex={-1}><Typography align="left" variant="subtitle1"><Divider />
                Assignment Description: {assignments.assignmentDescription}
              </Typography></TableRow><Divider />
              <TableRow hover tabIndex={-1}><Typography align="left" variant="subtitle1">
                Percentage: {assignments.assignmentPercentage}
              </Typography></TableRow>
              </Table>
              </Paper>
              </main>
              </Grid>
            </React.Fragment></Layout>
    </div>
  );
}
