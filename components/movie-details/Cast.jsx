import Image from "next/image";

const Cast = ({ name, profile_path }) => {
  return (
    <div className="text-center">
      <Image
        src={`${process.env.TMDB_MOVIE_POSTER_ORIGINAL_PATH}${profile_path}`}
        alt="Naomi Scott"
        className="w-24 h-24 rounded-full object-cover mb-2"
        width={200}
        height={200}
      />
      <p className="text-sm">{name}</p>
    </div>
  );
};

export default Cast;
