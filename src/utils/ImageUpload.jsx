import React from 'react'
import { storage } from './firebase.config'
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
function ImageUpload() {
    const [displayName, setDisplayName] = React.useState("");
  const [profilePic, setProfilePic] = React.useState(null);

  const bucketRef = ref(storage, `images/${profilePic?.name}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadBytes(bucketRef, profilePic)
      .then((snapshot) => {
        console.log("File uploaded successfully");
        getDownloadURL(snapshot.ref)
          .then((url) => console.log(url))
          .catch((err) => console.log(err.message));
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(profilePic, displayName);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="profilePic"
          accept="image/*"
          onChange={(e) => {
            setProfilePic(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
        <input
          type="name"
          name="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
    </div> 
    
  )
}

export default ImageUpload
