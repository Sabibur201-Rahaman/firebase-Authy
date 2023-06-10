import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./utils/firebase.config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useSnackbar } from "notistack";

function Nav() {
  const{enqueueSnackbar}=useSnackbar()
  const navigate = useNavigate();
  const currentUser=React.useContext(AuthContext)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FirebaseAuth
          </Typography>
          {!currentUser&&
          <>
           <Button
            component={NavLink}
            to="/register"
            sx={{
              "&.active": {
                bgColor: "primary.main",
              },
            }}
            color="inherit"
          >
            Register
          </Button>
          <Button
            component={NavLink}
            to="/note"
            sx={{
              "&.active": {
                bgColor: "primary.main",
              },
            }}
            color="inherit"
          >
            Note
          </Button>
          <Button
            component={NavLink}
            to="/login"
            sx={{
              "&.active": {
                bgColor: "primary.main",
              },
            }}
            color="inherit"
          >
            Login
          </Button>
          </>
          }
          {currentUser&&
          <>
           <Button
            component={NavLink}
            to="/profile"
            sx={{
              "&.active": {
                bgColor: "primary.main",
              },
            }}
            color="inherit"
          >
            Profile
          </Button>
          <Button
            component={NavLink}
            to="/notes"
            sx={{
              "&.active": {
                bgColor: "primary.main",
              },
            }}
            color="inherit"
          >
            Notes
          </Button>
          <Button
            component={NavLink}
            to="/notes/add"
            sx={{
              "&.active": {
                bgColor: "primary.main",
              },
            }}
            color="inherit"
          >
            AddNotes
          </Button>
          <Button
            component={NavLink}
            to="/notes/edit/:noteId"
            sx={{
              "&.active": {
                bgColor: "primary.main",
              },
            }}
            color="inherit"
          >
            EditNote
          </Button>
          <Button
            component={NavLink}
            to="/private"
            sx={{
              "&.active": {
                bgColor: "primary.main",
              },
            }}
            color="inherit"
          >
            Private
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              signOut(auth);
              enqueueSnackbar('logedOut succesfully',{
                variant:'success',
                autoHideDuration:2000
               })
              navigate('/login')
            }}
          >
            LogOut
          
          </Button>
          </>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Nav;
