/* eslint-disable react/prop-types */
import React from 'react'
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";

import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { notesColRef } from '../firebase.config';
import { deleteDoc,doc } from 'firebase/firestore';
function Note({note}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const currentUser  = React.useContext(AuthContext);
  const checkOwnerShip = currentUser?.uid === note.user.id;

  const handleClick = (e) => {
    console.log(e.currentTarget);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const docRef = doc(notesColRef, note.id);
    try {
      if (checkOwnerShip) {
        await deleteDoc(docRef);
        console.log("Note deleted successfully");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {note?.user?.displayName[0].toUpperCase()}
          </Avatar>
        }
        action={
          checkOwnerShip ? (
            <IconButton onClick={handleClick} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          ) : null
        }
        title={note.user?.displayName}
        subheader={note.createdAt.toDate().toLocaleDateString()}
      ></CardHeader>

      <CardContent>
        <Menu
          onClose={handleClose}
          onClick={handleClose}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem component={Link} to={`edit/${note.id}`}>
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
        <Typography variant="h5" color="text.primary">
          {note.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {note.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Note
