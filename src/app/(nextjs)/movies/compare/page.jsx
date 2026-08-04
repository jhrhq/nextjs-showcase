import AddCompareMovieSlotButton from "@/domains/movies/components/compare/AddCompareMovieSlotButton";
import CompareMovieSlots from "@/domains/movies/components/compare/CompareMovieSlots";
import Navbar from "@/domains/movies/components/Navbar";
import CompareMovieProvider from "@/domains/movies/context-providers/CompareMovieSlotProvider";

const ComparePage = () => {
  return (
    <>
      <Navbar />
      {/* Main Content */}
      <CompareMovieProvider>
        <main className="container mx-auto px-4 pt-24 pb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Compare Movies</h1>
            <AddCompareMovieSlotButton />
          </div>
          {/* Movie Comparison Container */}
          <div className="grid gap-6 md:grid-cols-2">
            <CompareMovieSlots />
          </div>
        </main>
      </CompareMovieProvider>
      {/* Movie Search Modal */}
    </>
  );
};

export default ComparePage;
