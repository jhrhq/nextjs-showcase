import type { TMDBMovieDetails } from "../../types/tmdb-movi-details.types";

const Genres = ({ genres }: { genres: TMDBMovieDetails["genres"] }) => {
  if (!genres || genres.length === 0) return null;
  return (
    <div className="mb-8">
      <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Genres</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <span
            key={genre.id}
            className="px-3.5 py-1.5 bg-secondary/80 text-secondary-foreground hover:bg-secondary rounded-full text-xs font-medium border border-border transition-colors"
          >
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Genres;
