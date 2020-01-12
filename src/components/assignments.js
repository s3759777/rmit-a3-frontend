import React, { Component, useMemo, useState, useEffect } from "react";
import { useRoutes, A } from "hookrouter";
import { Link } from "react-router-dom";
import {
  Paper,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Table,
  TableRow,
  TableBody,
  TableHead, Input,
  TableCell,
  Toolbar,
  Dialog,
  AppBar,
  Slide, Slider,
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

const url = "https://serene-lowlands-53583.herokuapp.com/assignments";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Assigments() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState();

  const [assignments, setAssignments] = useState([]);
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [serverID, setServerID] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentPercentage, setAssignmentPercentage] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [isSent, setIsSent] = useState(false);





  function updateItem(id) {
      let formData = new FormData();    //formdata object

      formData.append('name', 'hello' );   //append the values with key, value pair


      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(url, formData, config)
      .then(res => res.json())
      .then(() => window.location.reload())
      .catch(() => alert("There was an error, please try again"));


    {/*fetch(url + "/" + id, {
      method: "put",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'},
      body: JSON.stringify({
        assignmentDescription: assignmentDescription,
        assignmentName: assignmentName,
        assignmentPercentage: assignmentPercentage
      }) //change param here
  })
      .then(res => res.json())
      .then(() => window.location.reload())
      .catch(() => alert("There was an error, please try again"));*/}
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

  function editItem(assignmentName, assignmentDescription, assignmentPercentage, serverID) {
    setAssignmentName(assignmentName);
    setAssignmentDescription(assignmentDescription);
    setAssignmentPercentage(assignmentPercentage);
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
      setFilter("assignmentName", value);
      setFilterInput(value);
    };

    // Render the UI for your table
    return (
      <>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4" id="tableTitle">
              Assigment List
            </Typography>
            <p></p>
            <p></p>
            <Grid container>
              <Grid item align="left" lg={9}>
                <Link to="/assignmentList/new"
                  style={{ color: "#455a64", width: "20" }}>
                  <Button
                    className={classes.buttons}
                    variant="contained"
                    color="primary">
                    <AddIcon /> Add assignment
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
                              assignmentId={assignmentDescription}
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
        Header: "Name",
        id: "assignmentName",
        accessor: "assignmentName"
      },


      {
        Header:  <div style={{ textAlign: "right" }}>
           Percentage
         </div>,
        id: "assignmentPercentage",
        accessor: "assignmentPercentage",
        Cell: ({row}) => (<div style={{ textAlign: "right" }}>{row.original.assignmentPercentage}</div>)
      },
      {
        Header: <div style={{ textAlign: "center" }}>
           Description
         </div>,
        id: "assignmentDescription",
        accessor: "assignmentDescription",
        Cell: ({row}) => (<div style={{ textAlign: "center" }}>{row.original.assignmentDescription}</div>)
      },
      {
        Header: () => (<div style={{textAlign: "right"}}>
            Action
          </div>
        ),
        id: "action",
        Cell: ({ row }) => (
          <div style={{ textAlign: "right" }}>
            <Link to={`/assignmentList/${row.original._id}`}>
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
                  editItem(row.original.assignmentName, row.original.assignmentDescription, row.original.assignmentPercentage, row.original._id);
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
                      "Delete this assignment? \n" + row.original.assignmentName
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
        title="Assignments"
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
                    Edit assignment information
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


                    <Grid align="right" item xs={12}>
                      <Button
                        autoFocus
                        color="secondary"
                        onClick={() => {
                          handleClose();
                          window.confirm(
                            "Delete this assignment? \n" + assignmentName
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
                            "Update this assignment? \n" + assignmentName
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
