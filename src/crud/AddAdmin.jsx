import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Layout from "../Layout";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useStyles from "../useStyles";
import { Button } from "@material-ui/core";
import { signUp } from "../auth";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function AddAdmin() {
  const classes = useStyles();

  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
    success: false
  });

  const { username, password, success, error } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const addAdmin = event => {
    event.preventDefault();
    setValues({ ...values, error: false });

    signUp({ username, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          username: "",
          password: "",
          error: "",
          success: true
        });
      }
    });
  };
  const showError = () => (
    <div
      className="alert alert-danger text-center"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success text-center"
      style={{ display: success ? "" : "none" }}
    >
      Admin user succesfully created
    </div>
  );

  const AddAdminForm = () => {
    const classes = useStyles();

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <React.Fragment>
            <Grid>
              <main className={classes.layout}>
                <Paper className={classes.paper}>
                  <Typography component="h1" variant="h4" align="center">
                    Add Admin
                  </Typography>

                  <p></p>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="username"
                        name="username"
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={handleChange("username")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={handleChange("password")}
                      />
                    </Grid>
                  </Grid>

                  <div className={classes.buttons}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={addAdmin}
                    >
                      Add
                    </Button>
                  </div>
                </Paper>
              </main>
            </Grid>
          </React.Fragment>
        </main>
      </React.Fragment>
    );
  };

  return (
      <Layout
          title="Add Admin"
          className="container-fluid"
      >
      <div className="row">
        <div className="col-xl-2 col-sm-12 pb-2">

        </div>
        <div className="col-xl-10 col-sm-12 p-2">
          {showSuccess()}
          {showError()}
          {AddAdminForm()}
        </div>
      </div>
    </Layout>
  );
}
