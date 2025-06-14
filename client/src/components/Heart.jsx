export default function Heart({ liked, setLiked }) {
  return (
    <i
      class={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setLiked(!liked);
      }}
    ></i>
  );
}
