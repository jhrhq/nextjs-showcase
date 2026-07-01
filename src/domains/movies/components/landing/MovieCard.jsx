import Image from "next/image";
import Link from "next/link";
import { AUTH_CONFIG } from "@/domains/movies/constants/auth.constant";

const MovieCard = async ({ id, title, poster_path, release_date }) => {
  return (
    <div className="shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
      <Link href={`${AUTH_CONFIG.ROUTES.HOME}/${id}`}>
        <Image
          width={500}
          height={500}
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-full rounded-lg"
        />
        <div className="mt-2">
          <h3 className="text-light text-sm font-bold truncate">{title}</h3>
          <p className="text-primary text-xs">{release_date ? new Date(release_date).getFullYear() : "unknown"}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
