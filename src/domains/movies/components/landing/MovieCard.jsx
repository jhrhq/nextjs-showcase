import Image from "next/image";
import Link from "next/link";
import { AUTH_CONFIG } from "@/domains/movies/constants/auth.constant";

const MovieCard = async ({ id, title, poster_path, release_date }) => {
  return (
    <div className="shrink-0 w-48 cursor-pointer group transition-transform">
      <Link href={`${AUTH_CONFIG.ROUTES.HOME}/${id}`}>
        <div className="overflow-hidden rounded-lg shadow-md bg-muted aspect-[2/3] relative">
          <Image
            width={500}
            height={500}
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="mt-2">
          <h3 className="text-foreground text-sm font-semibold truncate group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-xs mt-0.5">
            {release_date ? new Date(release_date).getFullYear() : "Unknown"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
