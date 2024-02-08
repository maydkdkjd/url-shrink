import React, { useState } from 'react';
import {
  Button, CssBaseline, TextField, Link, Grid, Box,
  Typography, Container, Collapse, Alert, IconButton
} from '@mui/material'

import { Close as CloseIcon } from '@mui/icons-material'

import { useNavigate, NavLink } from 'react-router-dom';
import { LogoLarge } from '../components/Logo';

export function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [error, setError] = useState('');

  const history = useNavigate();
  const register = async (user) => {
    const response = await fetch(`/users/register`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
      },
    })
    if (!response.ok) {
      const { message } = await response.json();
      setErrMsg(`${response.statusText}: ${message}`);
    } else {
      return history('/login');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrMsg('');
    if (password !== confirmPassword){
      setError("Passwords do not match");
      return;
    } 

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      password2: confirmPassword,
    }
    register(newUser);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ my: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        <LogoLarge />
        <Typography component="h1" variant="h5">
          Create your Short URL account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Collapse in={errMsg.length !== 0}>
            <Alert variant='outlined' severity='error'
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => { setErrMsg(''); }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 3 }}
            >
              {errMsg}
            </Alert>
          </Collapse>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required={true}
                fullWidth
                id="firstName"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value) }}
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                fullWidth
                id="lastName"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value) }}
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={true}
                fullWidth
                id="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={true}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={true}
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value) }}
              />
            </Grid>
          </Grid>
          <small style={{color: 'red'}}>{error}</small>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Link component={NavLink} to="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp