import Cast from "@/components/movie-details/Cast";
import { getSelectedMovieCasts } from "@/lib/movie-info";

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
