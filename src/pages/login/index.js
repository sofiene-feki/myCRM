import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { createOrUpdateUser } from "../../functions/user";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      komparDev Service {""}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  //const from = location.state?.from?.pathname || "/" ;
  const { user } = useSelector((state) => ({ ...state }));

  // useEffect(() => {
  //   if (user) {
  //     history("/");
  //   }
  // }, [user, history]);

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history("/admin");
    }
    if (res.data.role === "superviseur") {
      history("/admin");
    }
    if (res.data.role === "quality") {
      history("/quality");
    }
    if (res.data.role === "wc") {
      history("/wc");
    }
    if (res.data.role === "backOffice") {
      history("back-office");
    }
    if (res.data.role === "support") {
      history("/support");
    }
    if (res.data.role === "sav") {
      history("/sav");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const resp = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const { user } = resp;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              displayName: res.data.displayName,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
              photoURL: res.data.photoURL,
            },
          });
          setLoading(false);
          roleBasedRedirect(res);
          //history(from, {replace : true})
        })
        .catch((err) => alert(err));
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const handleFormFieldUpdate = (value, field) => {
    setForm({ ...form, [field]: value });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>

          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={(event) =>
                handleFormFieldUpdate(event.target.value, "email")
              }
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(event) =>
                handleFormFieldUpdate(event.target.value, "password")
              }
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign in"}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 6, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
