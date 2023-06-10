import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";
import Private from "./Private";
import Nav from "./Nav";
import Login from "./Login";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { Fade } from "@mui/material";
import './utils/firebase.config'
import AddNotes from "./utils/notes/AddNotes";
import EditNotes from "./utils/notes/EditNotes";
import Notes from "./utils/notes/Notes";
import { NoteProvider } from "./context/NoteContext";
import Note from "./utils/notes/Note";
const AuthRequired = ({ children }) => {
  const location = useLocation();
  // console.log(location);
  const currentUser = React.useContext(AuthContext);
  if (currentUser) {
    return children;
  } else {
    <Navigate to="/login" state={{ from: location.pathname }} />;
  }
};
function App() {
  return (
    <>
    <SnackbarProvider maxSnack={3}
    anchorOrigin={{ vertical:'top', horizontal:'right' }}
    >
       <NoteProvider>
      <AuthProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route index element={<Notes/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/note" element={<Note />} />
            <Route path="/notes/add" element={<AuthRequired><AddNotes /></AuthRequired>} />
            <Route path="/notes/edit/:noteId" element={<AuthRequired><EditNotes /></AuthRequired>} />
            <Route path="/login" element={<Login />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="resetpassword" element={<ResetPassword />} />
            <Route
              path="profile"
              element={
                <AuthRequired>
                  <Profile />
                </AuthRequired>
              }
            />
            <Route
              path="Private"
              element={
                <AuthRequired>
                  <Private />
                </AuthRequired>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      </NoteProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
