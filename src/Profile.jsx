import React from 'react'
import ImageUpload from './utils/ImageUpload'
import { AuthContext } from './context/AuthContext'
function Profile() {
  const currentUser=React.useContext(AuthContext)
  // console.log(currentUser)
  return (
    <div>
     <ImageUpload/>
    </div>
  )
}

export default Profile
