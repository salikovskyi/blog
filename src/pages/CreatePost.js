import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storageRef } from "../firebase";
import { uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function CreatePost({isAuth}) {
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
    const [error, setError] = useState(null);
    const [photo, setPhoto] = useState(null);

    const types = ["image/png", "image/jpeg"];

    const changeHandler = (e) => {
      let selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        uploadBytes(storageRef, selected).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          });
        setPhoto(selected);
        setError('');
      } else {
        setPhoto(null);
        setError("please select an image file (png or jpeg)");
      }
    };
    const postsCollectionRef = collection(db, "posts");
    let navigate = useNavigate()
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      descr,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate('/')
  };
  
  return (
    <div className="createPostPage">
      <div className="container">
        <h1>Create Post</h1>
        <div className="input">
          <label>Title:</label>
          <input
            placeholder="Title..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="input">
          <label>Descr:</label>
          <input
            placeholder="Descr..."
            onChange={(e) => {
              setDescr(e.target.value);
            }}
          />
        </div>
        <div className="input">
          <label>Photo:</label>
          <input type="file" onChange={changeHandler} />
          <div className="output">
            {error && <div className="error">{error}</div>}
            {photo && <div>{photo.name}</div>}
          </div>
        </div>
        <button onClick={createPost}>Submit Post </button>
      </div>
    </div>
  );
}
