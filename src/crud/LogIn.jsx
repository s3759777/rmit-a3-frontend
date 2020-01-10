import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField, CircularProgress } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import { isAuthenticated, signIn, authenticate } from "../auth";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn() {
  const classes = useStyles();

  const [values, setValues] = useState({
    username: "admin0",
    password: "admin0",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { username, password, loading, error, redirectToReferrer } = values;
  const { admin } = isAuthenticated();

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (admin) {
        return <Redirect to="/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/dashboard" />;
    }
  };

  const showError = () => (
    <div
      className="alert alert-danger text-center"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h4 className="text-center"><CircularProgress color="secondary" /></h4>
      </div>
    );

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const submit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signIn({ username, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  const SignInForm = () => {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <TextField
              onChange={handleChange("username")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              value={username}
            />
            <TextField
              onChange={handleChange("password")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );
  };

  return (
    <div>
      {showLoading()}
      {showError()}
      {SignInForm()}
      {redirectUser()}
    </div>
  );
}
