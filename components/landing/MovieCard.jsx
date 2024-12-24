import Image from "next/image";
import Link from "next/link";

const MovieCard = async ({ id, title, poster_path, release_date }) => {
  return (
    <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
      <Link href={`/movie/${id}`}>
        <Image
          width={500}
          height={500}
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-full rounded-lg"
        />
        <div className="mt-2">
          <h3 className="text-light text-sm font-bold truncate">{title}</h3>
          <p className="text-primary text-xs">
            {release_date ? new Date(release_date).getFullYear() : "unknown"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
