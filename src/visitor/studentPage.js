import React, { useState, useEffect, useMatchParams } from "react";
import { useParams, Link } from "react-router-dom";
import Students from "../components/students";
import useStyles from "../useStyles";
import { Grid, Paper, Typography, Button, Table, TableCell, TableRow, Divider } from "@material-ui/core"
import { A } from "hookrouter"
import axios from "axios";
import LayoutVisitor from "./LayoutVisitor"

const url = "http://localhost:9000/students/";



export default function ViewStudentPage( props ) {
  const classes = useStyles();
  const [students, setStudents] = useState([]);
  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentYear, setStudentYear] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const {sId} = props;


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
            setStudents(response);
            setIsLoading(false);
        })
        .catch(() => alert("There was an error, please try again"));
  }, []);

  return (
    <div><LayoutVisitor
        title="Details"

        className="container-fluid"
    >

              <React.Fragment>
              <Grid>
              <main className={classes.layout}>
                  <Paper className={classes.paper}>
                  <Grid align="left">
                      <Link to="/visitor/students">
                        <Button color="primary" className={classes.button}>
                          Back
                        </Button>
                      </Link>
                    </Grid>
                    <p></p>
                    <Table>
                    <TableRow hover tabIndex={-1}><Typography align="left" variant="h6" gutterBottom>
                 {students.studentName}
              </Typography></TableRow>
              <TableRow hover tabIndex={-1}><Typography align="left" variant="subtitle1"><Divider />
                Student ID: {students.studentID}
              </Typography></TableRow><Divider />
              <TableRow hover tabIndex={-1}><Typography align="left" variant="subtitle1">
                Year: {students.studentYear}
              </Typography></TableRow>
              </Table>
              </Paper>
              </main>
              </Grid>
            </React.Fragment></LayoutVisitor>
    </div>
  );
}
