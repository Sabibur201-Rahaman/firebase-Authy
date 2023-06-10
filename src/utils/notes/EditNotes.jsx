import React from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { notesColRef } from "../firebase.config";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function EditNotes() {
  const [note, setNote] = React.useState({
    title: "",
    description: "",
  });
  const {noteId} = useParams();//it will destructure {noteId}
  // console.log(noteId.noteId);
  React.useEffect(() => {
    (async () => {
      const docRef = doc(notesColRef, noteId);
      const currentDoc = await getDoc(docRef);
      if (currentDoc.exists) {
        const data = currentDoc.data();
        console.log("Document Exist", data);
        setNote({
          ...data,
        });
      }
    })();
  }, [noteId]);
  const navigate = useNavigate();
  const currentUser = React.useContext(AuthContext);
  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    console.log(note)
    e.preventDefault();
    const docRef = doc(notesColRef, noteId);
    if (note.user.id === currentUser.uid) {
      await updateDoc(docRef, {
        ...note,
      });
      console.log("updated succesfully");
      navigate("/notes");
    } else {
      console.log("Not have enough permission to update the note");
      navigate("/notes");
    }
  };
  return (
    <Container maxWidth="xs">
      <Typography
        variant="h5"
        component="h1"
        textAlign="center"
        sx={{ mt: 2, color: "text.secondary" }}
      >
        Update Note
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          name="title"
          label="Title"
          variant="filled"
          onChange={handleChange}
          value={note.title}
          fullWidth
          required
        />

        <TextField
          multiline
          required
          value={note.description}
          name="description"
          fullWidth
          variant="filled"
          label="Description"
          onChange={handleChange}
          rows="5"
        />
        <Button color="primary" variant="contained" type="submit">
          Update Note
        </Button>
      </Box>
    </Container>
  );
}

export default EditNotes;
