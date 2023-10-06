import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  button: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

function Register() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <Container className={classes.container} maxWidth="xs">
      <TextField
        label="Full Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={classes.textField}
      />
      <TextField
        label="E-mail Address"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={classes.textField}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={classes.textField}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={register}
        className={classes.button}
      >
        Register
      </Button>
      <Button
        variant="contained"
        color="default"
        onClick={signInWithGoogle}
        className={classes.button}
      >
        Register with Google
      </Button>
      <Typography variant="body2">
        Already have an account?{" "}
        <Link className={classes.link} to="/">
          Login
        </Link>{" "}
        now.
      </Typography>
    </Container>
  );
}

export default Register;
