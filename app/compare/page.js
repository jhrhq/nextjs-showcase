import CompareAddMovieAction from "@/app/_components/_compare/CompareAddMovieAction";
import CompareSelectedMovieCard from "@/components/compare/CompareSelectedMovieCard";
import Navbar from "@/components/Navbar";

const ComparePage = () => {
  return (
    <>
      <Navbar />
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Compare Movies</h1>
          <CompareAddMovieAction />
        </div>
        {/* Movie Comparison Container */}
        <div className="grid gap-6 md:grid-cols-2">
          <CompareSelectedMovieCard />

          <div className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
            <div className="flex justify-end mb-4">
              <button className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="flex-grow flex flex-col items-center justify-center">
              <a
                href="./search.html"
                className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Select Movie
              </a>
            </div>
          </div>
        </div>
      </main>
      {/* Movie Search Modal */}
    </>
  );
};

export default ComparePage;
