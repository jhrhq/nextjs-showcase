import Link from "next/link";

const MovieCard = () => {
  return (
    <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
      <Link href="/movie/1">
        <img
          src="https://image.tmdb.org/t/p/original/ht8Uv9QPv9y7K0RvUyJIaXOZTfd.jpg"
          alt="Smile 2"
          className="w-full rounded-lg"
        />
        <div className="mt-2">
          <h3 className="text-light text-sm font-bold truncate">Smile 2</h3>
          <p className="text-primary text-xs">2023</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
