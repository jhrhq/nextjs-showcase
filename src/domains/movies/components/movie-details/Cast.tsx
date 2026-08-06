import Image from "next/image";
import { TMDB_MOVIE } from "../../constants/tmdb.constant";

const Cast = ({ name, profile_path }) => {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted mb-2 shadow-md border border-border group-hover:border-primary transition-colors">
        <Image
          src={`${TMDB_MOVIE.POSTER_ORIGINAL_PATH}${profile_path}`}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          width={200}
          height={200}
        />
      </div>
      <p className="text-sm font-medium text-foreground tracking-tight group-hover:text-primary transition-colors">
        {name}
      </p>
    </div>
  );
};

export default Cast;
