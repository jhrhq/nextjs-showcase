import Cast from "@/domains/movies/components/movie-details/Cast";
import { getSelectedMovieCasts } from "@/domains/movies/services/tmdb";

const CastList = async ({ movieId }) => {
  const casts = await getSelectedMovieCasts(movieId);
  const shortCasts = casts?.cast?.slice(0, 5) || [];

  if (shortCasts.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground tracking-tight">Top Cast</h3>
      <div className="flex flex-wrap gap-6">
        {shortCasts.map((item) => (
          <Cast key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CastList;
