import { getBlurData } from "@/utils/blur-generator";
import Image from "next/image";
import Link from "next/link";

const MovieCard = async ({ title, poster_path, release_date }) => {
  const { base64 } = await getBlurData(
    `${process.env.TMDB_MOVIE_POSTER_PATH}${poster_path}`
  );

  return (
    <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
      <Link href="/movie/1">
        <Image
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={base64}
          src={`${process.env.TMDB_MOVIE_POSTER_PATH}${poster_path}`}
          alt={title}
          className="w-full rounded-lg"
        />
        <div className="mt-2">
          <h3 className="text-light text-sm font-bold truncate">{title}</h3>
          <p className="text-primary text-xs">
            {new Date(release_date).getFullYear()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
