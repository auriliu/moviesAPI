// import { useState } from "react";
// import { useUser } from "../UserContext.jsx";

// export default function Heart({ movie, addMovie, removeMovie }) {
//   const { user } = useUser();

//   // // NEW TAKE

//   const [liked, setLiked] = useState(() => {
//     if (!user) return false;
//     return localStorage.getItem(`liked_${user}_${movie.id}`) === "true";
//   });
//   // // NEW TAKE

//   // const [liked, setLiked] = useState(
//   //   () => localStorage.getItem(`liked_${movie.id}`) === "true"
//   // );

//   const toggleLike = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     setLiked((prev) => {
//       localStorage.setItem(`liked_${movie.id}`, !prev);

//       if (!prev) {
//         addMovie(movie);
//       } else {
//         removeMovie(movie.id);
//       }

//       return !prev;
//     });
//   };

//   return (
//     <i
//       title="like"
//       className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
//       onClick={toggleLike}
//     ></i>
//   );
// }

// NEW TAKE ///////////////////////////////////////////////////////////
// NEW TAKE ///////////////////////////////////////////////////////////
// NEW TAKE ///////////////////////////////////////////////////////////
import { useState, useEffect } from "react"; // NEW
import { useUser } from "../UserContext.jsx";

export default function Heart({ movie, addMovie, removeMovie }) {
  const { user } = useUser();
  const [liked, setLiked] = useState(false); // NEW

  useEffect(() => {
    if (!user) return; // NEW
    const likedStatus = localStorage.getItem(`liked_${user}_${movie.id}`); // NEW
    setLiked(likedStatus === "true"); // NEW
  }, [user, movie.id]); // NEW

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return; // NEW

    setLiked((prev) => {
      const newLiked = !prev; // NEW
      localStorage.setItem(`liked_${user}_${movie.id}`, newLiked); // NEW

      if (newLiked) {
        addMovie(movie);
      } else {
        removeMovie(movie.id);
      }

      return newLiked; // NEW
    });
  };

  return (
    <i
      title="like"
      className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
      onClick={toggleLike}
    ></i>
  );
}
