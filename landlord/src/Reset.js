import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "./firebase";
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

function Reset() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <Container className={classes.container} maxWidth="xs">
      <TextField
        label="E-mail Address"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={classes.textField}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => sendPasswordResetEmail(email)}
        className={classes.button}
      >
        Send password reset email
      </Button>
      <Typography variant="body2">
        Don't have an account?{" "}
        <Link className={classes.link} to="/register">
          Register
        </Link>{" "}
        now.
      </Typography>
    </Container>
  );
}

export default Reset;
