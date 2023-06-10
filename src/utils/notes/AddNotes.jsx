import React from 'react'
import{Container,Typography,Button,TextField,Box,CssBaseline,Grid} from '@mui/material'
import {Timestamp, addDoc} from 'firebase/firestore'
import { notesColRef } from '../firebase.config'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function AddNotes() {
  const navigate=useNavigate()
  const[note,setNote]=React.useState({
    title:'',
    description:'',
  })
  //for refference 
  const currentUser=React.useContext(AuthContext)
  // const {uid}=currentUser 
  // const {uid:id}=React.useContext(AuthContext)
    const handleSubmit=(e)=>{
      e.preventDefault()
      addDoc(notesColRef,{
        ...note,
        createdAt:Timestamp.fromDate(new Date()),
        user:{
          id:currentUser.uid,
          email:currentUser.email,
          displayName:currentUser.displayName
        }
      }).then(()=>{
        navigate('/notes')
        console.log('note added succesfully')
      }).catch((err)=>console.log(err.message))
      console.log(note)
      
    }
    const handleChange=(e)=>{
     setNote({
      ...note,
      [e.target.name]:e.target.value 
     }) 
    }
  return (
    
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
          
          <Typography component="h1" variant="h5">
            Add Note
          </Typography>
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              AddNote
            </Button>
            </Box>
             </Container>
             
  )
}

export default AddNotes
