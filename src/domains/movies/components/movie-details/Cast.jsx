import Image from "next/image";
import { TMDB_MOVIE_POSTER_ORIGINAL_PATH } from "@/domains/movies/constants/constant";

const Cast = ({ name, profile_path }) => {
  return (
    <div className="text-center">
      <Image
        src={`${TMDB_MOVIE_POSTER_ORIGINAL_PATH}${profile_path}`}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mb-2"
        width={200}
        height={200}
      />
      <p className="text-sm">{name}</p>
    </div>
  );
};

export default Cast;
