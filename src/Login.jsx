
import * as React from 'react';
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
import { Link as Navigate,useNavigate,useLocation } from 'react-router-dom';
import {signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import { useSnackbar } from 'notistack';
import { auth } from './utils/firebase.config';

function Login() {
  const[userInfo,setUserInfo]=React.useState({
    email:'',
    password:''
  })
  const{enqueueSnackbar}=useSnackbar()
  const {state}=useLocation()
  const navigate=useNavigate()
  const handleChange=(e)=>{
    setUserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    })
  }
  const googleSignIn=async()=>{
const provider=new GoogleAuthProvider()
try{
  await signInWithPopup(auth,provider)
  enqueueSnackbar('logedin succesfully',{
    variant:'success'
   })
  navigate('/profile')
}catch(err){
  enqueueSnackbar('checked id and password',{
    variant:'error'
   })
console.log(err.message)
}

  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    //submitting to firebase
    try{
      await signInWithEmailAndPassword(auth,userInfo.email,userInfo.password)
      enqueueSnackbar('logedin succesfully',{
        variant:'success',
        autoHideDuration:2000
       })
     navigate(state?.from||'/profile')
    }catch(err){
      enqueueSnackbar('checked id and password',{
        variant:'error',
        autoHideDuration:2000
       })
      console.log(err.message)
    }
  }
  return (
    <div>
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
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
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
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={Navigate} to={'/forgotpassword'}  variant="body2">
                  forgotPassword? Reset Password
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Button
              type="submit"
              onClick={googleSignIn}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In with Google
            </Button>
        </Box>
      </Container>
    </div>
  )
}

export default Login

