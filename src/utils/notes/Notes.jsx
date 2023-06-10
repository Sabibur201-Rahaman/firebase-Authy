import React from 'react'
import { NoteContext } from '../../context/NoteContext'
import { Container,Grid } from '@mui/material'
// import Note from "./utils/notes/Note";
import Note from './Note';
function Notes() {
  const{notes}=React.useContext(NoteContext)

if(notes){
  console.log(notes)
}
  return <Container sx={{mt:2}}>
    <Grid container spacing={2}>
  {notes &&
  notes.map((note)=>{
    return(
      <Grid item sm={4} key={note.id}>
        <Note note={note}/>
      </Grid>
    )
  })
  }
    </Grid>
  </Container>
}

export default Notes
