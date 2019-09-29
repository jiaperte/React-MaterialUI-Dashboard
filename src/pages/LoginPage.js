import React from "react";

import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import { connect } from "react-redux";
import { compose } from "recompose";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { userSignsIn } from "../actions";
import Admin from "layouts/Admin.js";
import axios from "axios";
import Qs from "querystring";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
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
});

const hist = createBrowserHistory();
axios.defaults.baseURL = "https://192.168.1.115:44357";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    rememberChecked: false,
    emailError: false,
    passwordError: false
  };
  //handle Sign In event
  handleSignIn = async e => {
    e.preventDefault();
    // if (!(this.state.username === "" || this.state.password === ""))
    //   this.props.userLogIn(this.state);
    if (this.state.email === "") {
      this.setState({ emailError: true });
    } else if (this.state.password === "") {
      this.setState({ passwordError: true });
    } else {
      let postdata = {
        grant_type: "password",
        userName: this.state.email,
        password: this.state.password
      };
      try {
        const response = await axios({
          method: "post",
          url: "/Token",
          data: Qs.stringify(postdata)
        });
        if (this.state.rememberChecked) {
          console.log(response.data);
        }

        ReactDOM.render(
          <Router history={hist}>
            <Switch>
              <Route path="/admin" component={Admin} />
              <Redirect from="/" to="/admin/dashboard" />
            </Switch>
          </Router>,
          document.getElementById("root")
        );
      } catch (err) {}
    }
  };

  handleInputValueChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    if (name === "email") {
      this.setState({
        emailError: false
      });
    }
    if (name === "password") {
      this.setState({
        passwordError: false
      });
    }
  };

  handleChecked = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  };

  render() {
    let { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={this.handleSignIn}
          >
            <TextField
              error={this.state.emailError}
              helperText={this.state.emailError ? "Enter Email address" : null}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={this.handleInputValueChange("email")}
              autoComplete="email"
              autoFocus
            />
            <TextField
              error={this.state.passwordError}
              helperText={this.state.passwordError ? "Enter Password" : null}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={this.handleInputValueChange("password")}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={this.handleChecked("rememberChecked")}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSignIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

//export default withStyles(useStyles)(SignIn);

function mapStateToProps(state) {
  return {
    userStatus: state.user.status,
    currentUsername: state.user.username
  };
}

export default compose(
  connect(
    mapStateToProps,
    { userLogIn: userSignsIn }
  ),
  withStyles(useStyles)
)(SignIn);
