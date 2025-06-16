import { useState } from "react";

export default function Heart({ movie, addMovie, removeMovie }) {
  const [liked, setLiked] = useState(
    () => localStorage.getItem(`liked_${movie.id}`) === "true"
  );

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLiked((prev) => {
      localStorage.setItem(`liked_${movie.id}`, !prev);

      if (!prev) {
        addMovie(movie);
      } else {
        removeMovie(movie.id);
      }

      return !prev;
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
