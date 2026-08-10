const SearchHeader = ({ text, movieLength = 0 }: { text: string; movieLength: number }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Search Results for &quot;{text}&quot;</h1>
      <p className="text-sm font-medium text-muted-foreground">
        Found {movieLength} {movieLength === 1 ? "result" : "results"}
      </p>
    </div>
  );
};

export default SearchHeader;
