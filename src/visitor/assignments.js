import React, { Component, useMemo, useState, useEffect } from "react";
import { useRoutes, A } from "hookrouter";
import {Link } from "react-router-dom";
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

import LayoutVisitor from "./LayoutVisitor"

import useStyles from "../useStyles";
import axios from "axios";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";

const url = "http://localhost:9000/assignments";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VisitorAssigments() {
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







  // Using useEffect to call the API once mounted and set the data

  useEffect(() => {
    (async () => {
      const result = await axios(url);
      var list = result.data.filter(
        products =>
          products.assignmentDescription && products.assignmentName && products.assignmentPercentage
      );
      setData(list);
      setIsLoading(false);
    })();
  }, []);


  const handleSliderChange = (event, newPercentage) => {
    setAssignmentPercentage(newPercentage);
  };

  const handleInputChange = event => {
    setAssignmentPercentage(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (assignmentPercentage < 0) {
      setAssignmentPercentage(0);
    } else if (assignmentPercentage > 100) {
      setAssignmentPercentage(100);
    }
  };
  function valuetext(value) {
    return `${value}`;
  }

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
            <Link to={`/visitor/assignments/${row.original._id}`}>
              <Tooltip title="View" aria-label="view">
                <IconButton color="default">
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            </Link>

          </div>
        )
      }
    ],
    []
  );

  return (
    <div><LayoutVisitor
        title="Assignments"
        description="Search and find books of your choice"
        className="container-fluid"
    >
      <div>
        <Table0 columns={columns} data={data} />


      </div></LayoutVisitor>
    </div>
  );
}
