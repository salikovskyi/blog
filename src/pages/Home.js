import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";

export default function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost]);

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div className="post">
            <div className="wrap">
              <h1>{post.title}</h1>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    className="deleteBtn"
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    🗑️
                  </button>
                )}
              </div>
              <p>{post.descr}</p>
              <h3>@{post.author.name}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
