import React, { useEffect, useState } from 'react';
import {
  Button, CssBaseline, TextField, Link,
  Typography, Container, Grid, Box, Alert
} from "@mui/material"
import { loginUser } from '../helpers/helpers';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogoLarge } from '../components/Logo';
import useUser from '../contexts/user';

export function Login() {
  const history = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get('email'),
      password: data.get('password')
    };

    try {
      const res = await loginUser(user);
      if (res.isAuth) {
        login(res);
        history('/');
      }
      else {
        setError("Invalid username or password")
        // alert("something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
    
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          my: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LogoLarge />
        <Typography component="h1" variant="h5" sx={{ my: 2 }}>
          Sign in to your Short URL account
        </Typography>
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <small style={{ color: 'red' }}>{error}</small>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link component={NavLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
