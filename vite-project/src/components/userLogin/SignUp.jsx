import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
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
import { signUpAsync } from '../../redux/user/thunks';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// COPY RIGHT: THIS PAGE CONTENT IS COPY AND MODIFY FROM https://github.com/mui/material-ui/blob/v5.15.20/docs/data/material/getting-started/templates/sign-up/SignUp.js 
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  const [accountType, setAccountType] = React.useState('');

  const handleChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      userName: data.get('userName'),
      email: data.get('email'),
      password: data.get('password'),
      accountType: accountType
    });
    const user = {
      UserName: data.get('userName'),
      Email: data.get('email'),
      Password: data.get('password'),
      accountType: accountType
    }
    if (!user.UserName || !user.Email || !user.Password || !user.accountType) {
      console.log("not allow for empty field");
    } else {
      dispatch(signUpAsync(user));
    }
  };


  useEffect(() => {
    if (isAuth == true) {
      console.log("Auth!!");
      // fromSignUp state is for displaying the warning after sign up
      if (accountType === 'Landlord') {
        navigate('/landlordAccount/profile', { state: { fromSignUp: 'Landlord' } });
      } else if (accountType === 'Tenant') {
        navigate('/tenantAccount/profile', { state: { fromSignUp: 'Tenant' } });
      }
    }
  }, [isAuth, dispatch, navigate, accountType]);


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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="userName"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="account-type">Account Type</InputLabel>
                <Select
                  required
                  labelId="account-type"
                  id="account-type"
                  value={accountType}
                  label="Account Type"
                  onChange={handleChange}
                >
                  <MenuItem value={"Landlord"}>Landlord</MenuItem>
                  <MenuItem value={"Tenant"}>Tenant</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
