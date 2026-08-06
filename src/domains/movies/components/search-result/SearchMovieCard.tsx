import Image from "next/image";
import Link from "next/link";
import { AUTH_CONFIG } from "@/domains/movies/constants/auth.constant";
import type { TMDBMovie } from "../../types/tmdb-movie.types";

type Props = TMDBMovie;
const SearchMovieCard = async ({ id, title, poster_path, release_date, vote_average }: Props) => {
  return (
    <Link
      href={`${AUTH_CONFIG.ROUTES.HOME}/${id}`}
      className="group bg-card rounded-lg overflow-hidden border border-border shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col"
    >
      <div className="relative w-full aspect-2/3 overflow-hidden bg-muted">
        <Image
          width={500}
          height={500}
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col grow justify-between">
        <h3 className="font-semibold text-sm text-foreground mb-2 truncate group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>{release_date ? new Date(release_date).getFullYear() : "Unknown"}</span>
          <div className="flex items-center gap-1">
            <span className="text-amber-500">★</span>
            <span className="text-foreground font-semibold">{vote_average ? vote_average.toFixed(1) : "0.0"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchMovieCard;
