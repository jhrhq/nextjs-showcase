import AddCompareMovieSlotButton from "@/app/_components/_compare/AddCompareMovieSlotButton";
import CompareMovieSlots from "@/app/_components/_compare/CompareMovieSlots";
import CompareMovieProvider from "@/app/providers/CompareMovieSlotProvider";
import Navbar from "@/components/Navbar";

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
