import Cast from "@/domains/movies/components/movie-details/Cast";
import { getSelectedMovieCasts } from "@/domains/movies/lib/movie-info";

const CastList = async ({ movieId }) => {
  const casts = await getSelectedMovieCasts(movieId);
  const shortCasts = casts.cast.slice(0, 5);
  return (
    <div className="flex flex-wrap gap-4">
      {shortCasts?.map((item) => (
        <Cast key={item.id} {...item} />
      ))}
    </div>
  );
};

export default CastList;
