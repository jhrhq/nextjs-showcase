import Image from "next/image";

const SearchMovieCard = async ({
  title,
  poster_path,
  release_date,
  vote_average,
}) => {
  // const { base64 } = await getBlurData(
  //   `${process.env.TMDB_MOVIE_POSTER_PATH}${poster_path}`
  // );
  return (
    <a
      href="details.html"
      className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
    >
      <Image
        width={500}
        height={500}
        // placeholder="blur"
        // blurDataURL={base64}
        src={`${process.env.TMDB_MOVIE_POSTER_PATH}${poster_path}`}
        alt={title}
        className="w-full aspect-[2/3] object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold mb-2">{title}</h3>
        <div className="flex justify-between text-sm text-gray-400">
          <span>
            {" "}
            {release_date ? new Date(release_date).getFullYear() : "unknown"}
          </span>
          <span>⭐ {vote_average ?? 0}</span>
        </div>
      </div>
    </a>
  );
};

export default SearchMovieCard;
