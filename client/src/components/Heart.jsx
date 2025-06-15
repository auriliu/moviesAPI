import { useState } from "react";

export default function Heart() {
  const [liked, setLiked] = useState(false);

  return (
    <i
      title="like"
      className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setLiked(!liked);
      }}
    ></i>
  );
}
