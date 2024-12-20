import MovieCard from "@/components/landing/MovieCard";

const HomeSections = ({ sectionTitle, children }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{sectionTitle}</h2>
      <div id="trendingMovies" className="flex space-x-4 overflow-x-auto pb-4">
        {children}
      </div>
    </section>
  );
};

export default HomeSections;
