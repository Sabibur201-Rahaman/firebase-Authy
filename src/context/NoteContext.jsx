import React from 'react'
import { notesColRef } from '../utils/firebase.config'
import { onSnapshot,getDoc,getDocs,doc } from 'firebase/firestore'
import { createContext } from 'react'

export const NoteContext=createContext()

export const NoteProvider=({children})=>{
const[notes,setNotes]=React.useState(null)
// console.log(notes)
React.useEffect(()=>{
   const unsubscribe= onSnapshot(notesColRef,snapshots=>{
        const notes=snapshots.docs.map(doc=>{
            return{
                id:doc.id,
                ...doc.data()
            }
        })
        setNotes(notes)
    })
    return()=>{
unsubscribe();
    }
},[])

const value={notes}
return <NoteContext.Provider value={value}>
    {children}
</NoteContext.Provider>
}