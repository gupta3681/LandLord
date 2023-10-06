import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Button,
  TextField,
  Container,
  Typography,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: theme.spacing(3),
    position: "relative",
    zIndex: 1,
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
  outlinedBox: {
    border: `1px solid ${"black"}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    width: "100%",
    maxWidth: 400, // or any other width you prefer
  },
  heading: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
  },
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  const options = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: ["#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 1,
      },
      size: {
        value: { min: 1, max: 8 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#808080",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: "out",
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <>
      <Particles options={options} init={particlesInit} />

      <Container className={classes.container} maxWidth="xs">
        <Typography variant="h4" className={classes.heading}>
          Welcome to LandLord!
        </Typography>
        <Paper className={classes.outlinedBox} elevation={0} variant="outlined">
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
            onClick={() => signInWithEmailAndPassword(email, password)}
            className={classes.button}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="default"
            onClick={signInWithGoogle}
            className={classes.button}
          >
            Login with Google
          </Button>
          <Typography variant="body2">
            <Link className={classes.link} to="/reset">
              Forgot Password
            </Link>
          </Typography>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link className={classes.link} to="/register">
              Register
            </Link>{" "}
            now.
          </Typography>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
