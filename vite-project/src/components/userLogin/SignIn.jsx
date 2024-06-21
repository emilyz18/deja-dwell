import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { signInAsync } from '../../redux/user/thunks';
import { useNavigate } from 'react-router-dom'

// COPY RIGHT: THIS PAGE CONTENT IS COPY AND MODIFY FROM https://github.com/mui/material-ui/blob/v5.15.20/docs/data/material/getting-started/templates/sign-in/SignIn.js 
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const isLandlord = useSelector((state) => state.user.isLandlord);
  const isTenant = useSelector((state) => state.user.isTenant);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      Email: data.get('email'),
      Password: data.get('password')
    }
    dispatch(signInAsync(user));
  };

  useEffect(() => {
    if (isAuth == true) {
      console.log("Auth!!");
      console.log("isLandlord!!: ", isLandlord);
      console.log("isTenant!!", isTenant);
      if (isLandlord) {
        navigate('/landlordAccount/applicants');
      } else if (isTenant) {
        navigate('/tenantAccount/matches');
      }
    }
  }, [isAuth, dispatch, isLandlord, isTenant, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}