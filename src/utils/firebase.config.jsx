
import { initializeApp } from "firebase/app";
import{ getAuth} from 'firebase/auth'
import {getFirestore,collection,getDocs,onSnapshot,getDoc,query, doc, addDoc, updateDoc, deleteDoc, where,} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyADwRodyvmKiAH-csS5O1HpKuxx8X_9H8Y",
  authDomain: "fir-authy-9202d.firebaseapp.com",
  projectId: "fir-authy-9202d",
  storageBucket: "fir-authy-9202d.appspot.com",
  messagingSenderId: "119253467974",
  appId: "1:119253467974:web:ed55ef5825e3d9c210db47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
const db=getFirestore(app)
export const notesColRef=collection(db,'notes')
export const storage=getStorage(app)
const queriedData=query(notesColRef,where('title','==','updated with hello title'))
 getDocs(queriedData)
.then(snapshot=>{
  const notes=[]
  snapshot.docs.forEach(doc=>{
  notes.push({
    ...doc.data(),
    id:doc.id,
    
  })
  
  })
  // console.log(notes)
 })

onSnapshot(notesColRef,(snapshot)=>{
  const notes=[]
  snapshot.docs.forEach(doc=>{
  notes.push({
    ...doc.data(),
    id:doc.id,
    
  })
  
  })
  // console.log(notes)
})
const docRef=doc(notesColRef,'u4J19iyedgC8AeHKhl18')
// getDoc(docRef)
// .then((doc)=>{
// console.log(doc.data(),doc.id)
// })
// .catch((err)=>console.lg(err))

// addDoc(colRef,{
//   title:'medical college workorder',
//   description:'description of work ',
//   user:{
// id:451256,
// name:'samim'
//   }
// })

// updateDoc(docRef,{
//   title:'pwd',
//   'user.displayName':'dipu'
// })

deleteDoc(docRef).then(()=>{
// console.log('sucessfully deleted docs')
})