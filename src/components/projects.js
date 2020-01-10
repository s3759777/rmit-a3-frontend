import React, { Component, useMemo, useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useRoutes, A } from "hookrouter";
import {
  Paper,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Toolbar,
  Dialog,
  AppBar,
  Slide, RadioGroup, FormControlLabel, Radio,
  Typography,
  Tooltip,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SaveIcon from "@material-ui/icons/Save";
import Layout from "../Layout"
import useStyles from "../useStyles";
import axios from "axios";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";

const url = "http://localhost:9000/projects";





const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Projects() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [projects, setProjects] = useState([]);


  const [name, setName] = useState(""); // project name

  const [projectImage, setProjectImage] = useState('')



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
  const [technologyUsed, setTechnologyUsed] = useState("");
  const [company, setCompany] = useState("");
  const [scope, setScope] = useState("");
  const [description, setDescription] = useState("");
  const [application, setApplication] = useState("");






  const urlAssignment = "http://localhost:9000/assignments";
  const urlCourse = "http://localhost:9000/courses";
  const urlStudents = "http://localhost:9000/students";


  const [serverID, setServerID] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [isSent, setIsSent] = useState(false);





  function updateItem(id, e) {



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



      const config = {
      headers: { 'content-type': 'multipart/form-data' }
  }

      axios.put(url + "/" + id, formData, config)
      .then(() => setIsSent(true))
    {/*  fetch(url + "/" + id, {
        method: "put",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify({
            name: name,
            description: description,
            company: company,
            technologyUsed: technologyUsed,
            scope: scope,
            application: application,

            semester: semester

        }) //change param here
      })
        .then(res => res.json())
        .then(() => window.location.reload())
        .catch(() => alert("There was an error, please try again"));
        */}

  };

  function deleteItem(id) {
    fetch(url + "/" + id, {
      method: "delete"
    })
      .then(res => res.json())
      .then(() => window.location.reload())
      .catch(() => alert("There was an error, please try again"));
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };



  function editItem(name, assignment, course, semester, tech, scope, application, company, description, serverID) {
    setName(name);
    setCourse(course);
    setSemester(semester);
    setTechnologyUsed(tech);
    setCompany(company);
    setApplication(application);
    setScope(scope);
    setAssignment(assignment);
    setDescription(description);
    setServerID(serverID)
  }

  // Using useEffect to call the API once mounted and set the data


  useEffect(() => {
    (async () => {
      const result = await axios(url);

      setData(result.data);
      setIsLoading(false);


    })();
  }, []);

  function Table0({ columns, data }) {
    const [filterInput, setFilterInput] = useState("");

    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      setFilter,
      pageOptions,
      page,
      state: { pageIndex, pageSize },
      previousPage,
      nextPage,
      setPageSize,
      canPreviousPage,
      canNextPage
    } = useTable(
      {
        columns,
        data
      },
      useFilters,
      useSortBy,
      usePagination
    );

    const handleFilterChange = e => {
      const value = e.target.value || undefined;
      setFilter("name", value);
      setFilterInput(value);
    };

    // Render the UI for your table
    return (
      <>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4" id="tableTitle">
              Project List
            </Typography>
            <p></p>
            <p></p>
            <Grid container>
              <Grid item align="left" lg={9}>
                <Link to="/projectList/new"
                  style={{ color: "#455a64", width: "20" }}>
                  <Button
                    className={classes.buttons}
                    variant="contained"
                    color="primary">
                    <AddIcon /> Create Project
                  </Button>
                </Link>
              </Grid>
              <p></p>
              <Grid item align="right">
                <TextField
                  onChange={handleFilterChange}
                  className={classes.margin}
                  variant="outlined"
                  size="small"
                  id="input-with-icon-textfield"
                  placeholder="Search"
                  value={filterInput}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <div>
              <Grid align="center">
                <Button
                  color="primary"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <ChevronLeftIcon />
                </Button>
                Page{" "}
                <em>
                  {pageIndex + 1} of {pageOptions.length}
                </em>
                <Button
                  color="primary"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  <ChevronRightIcon />
                </Button>
                <select
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[5, 10, 20].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </Grid>
            </div>
            <Grid>
              <Table {...getTableProps()}>
                <TableHead>
                  {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <TableCell
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className={
                            column.isSorted
                              ? column.isSortedDesc
                                ? "sort-desc"
                                : "sort-asc"
                              : ""
                          }
                        >
                          {column.render("Header")}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                  {isLoading && <CircularProgress color="secondary" />}
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <TableRow {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <TableCell
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Grid>
          </Paper>
        </div>
      </>
    );
  }

  const columns = useMemo(
    () => [
      {
        Header: "Project name",
        id: "name",
        accessor: "name"
      },

      {
        Header: <div style={{ textAlign: "left" }}>
           Assignment
         </div>,
        id: "assignment",
        accessor: "assignment",
        Cell: ({row}) => (<div style={{ textAlign: "left" }}>{row.original.assignment}</div>)
      },

      {
        Header: <div style={{ textAlign: "left" }}>
           Course
         </div>,
        id: "course",
        accessor: "course",
        Cell: ({row}) => (<div style={{ textAlign: "left" }}>{row.original.course}</div>)
      },
      {
        Header:  <div style={{ textAlign: "left" }}>
           Semester
         </div>,
        id: "semester",
        accessor: "semester",
        Cell: ({row}) => (<div style={{ textAlign: "left" }}>{row.original.semester}</div>)
      },

      {
        Header: () => (<div style={{textAlign: "right"}}>
            Action
          </div>
        ),
        id: "action",
        Cell: ({ row }) => (
          <div style={{ textAlign: "right" }}>
            <Link to={`/projectList/${row.original._id}`}>
              <Tooltip title="View" aria-label="view">
                <IconButton color="default">
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Tooltip title="Edit" aria-label="edit">
              <IconButton
                color="primary"
                onClick={e => {
                  handleClickOpen(e);
                  editItem(row.original.name, row.original.assignment, row.original.course, row.original.semester, row.original.technologyUsed,
                      row.original.scope, row.original.application, row.original.company, row.original.description, row.original._id);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                color="secondary"
                onClick={() => {
                  {
                    window.confirm(
                      "Delete this student? \n" + row.original.name
                    )
                      ? deleteItem(row.original._id)
                      : alert("Action cancelled.");
                  }
                }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],
    []
  );

  return (
    <div><Layout
        title="Students"
        className="container-fluid"
    >
      <div>
        <Table0 columns={columns} data={data} />

        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar
            className={classes.appBar}
            color="secondary"
            style={{
              backgroundImage:
                "url(https://wallpaperboat.com/wp-content/uploads/2019/06/minimalist-desktop-5.jpg)"
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="h6" className={classes.title}>
                Edit
              </Typography>
            </Toolbar>
          </AppBar>
          <React.Fragment>
            <Grid>
              <main className={classes.layout}>
                <Paper className={classes.paper}>
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
                  <Typography component="h1" variant="h4" align="center">
                    Edit student information
                  </Typography>

                  <p></p>
                  <Grid container spacing={3}>
                    <Grid item xs={12} align="left">


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
                        onChange={e => setTechnologyUsed(e.target.value)}
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



                    <Grid align="right" item xs={12}>
                      <Button
                        autoFocus
                        color="secondary"
                        onClick={() => {
                          handleClose();
                          window.confirm(
                            "Delete this student? \n" + name
                          )
                            ? deleteItem(serverID)
                            : alert("Action cancelled.");
                        }}
                      >
                        <DeleteIcon /> Delete
                      </Button>
                      <Button
                        autoFocus
                        color="primary"
                        onClick={() => {
                          handleClose();
                          window.confirm(
                            "Update this student? \n" + name
                          )
                            ? updateItem(serverID)
                            : alert("Action cancelled.");
                        }}
                      >
                        <SaveIcon />
                        Save
                      </Button>
                    </Grid>

                </Paper>
              </main>
            </Grid>
          </React.Fragment>
        </Dialog>
      </div></Layout>
    </div>
  );
}
