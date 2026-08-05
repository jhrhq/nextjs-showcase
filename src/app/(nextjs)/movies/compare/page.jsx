import AddCompareMovieSlotButton from "@/domains/movies/components/compare/AddCompareMovieSlotButton";
import CompareMovieSlots from "@/domains/movies/components/compare/CompareMovieSlots";
import Navbar from "@/domains/movies/components/Navbar";
import CompareMovieProvider from "@/domains/movies/context-providers/CompareMovieSlotProvider";

const ComparePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <CompareMovieProvider>
        <main className="container mx-auto px-4 pt-28 pb-16 grow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Compare Movies</h1>
              <p className="text-sm font-medium text-muted-foreground mt-1">
                Select up to 3 movies to compare ratings, release dates, and details side-by-side.
              </p>
            </div>
            <AddCompareMovieSlotButton />
          </div>

          <div className="w-full">
            <CompareMovieSlots />
          </div>
        </main>
      </CompareMovieProvider>
    </div>
  );
};

export default ComparePage;
