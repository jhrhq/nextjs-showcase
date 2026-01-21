import Image from "next/image";

function Comment({ comment }) {
  return (
    <article className="comment">
      <header>
        <Image width={500} height={500} alt="comment from avatar" src={comment.from.avatarSrc} />
        {comment.from.name}
      </header>
      <p>{comment.body}</p>
      <footer>Posted {comment.postedAt}</footer>
    </article>
  );
}

export default Comment;
