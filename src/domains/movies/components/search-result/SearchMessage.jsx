const SearchMessage = () => {
  return (
    <main className="container mx-auto px-4 pt-24 pb-8 bg-background min-h-screen">
      <div className="flex items-center px-6 py-16 mx-auto">
        <div className="flex flex-col items-center max-w-md mx-auto text-center">
          <div className="p-4 rounded-full bg-secondary/60 border border-border mb-6 shadow-inner">
            <svg
              className="w-10 h-10 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">Search for a movie</h1>
          <p className="text-sm font-medium text-muted-foreground">
            Please input a movie name in the search bar. E.g., &quot;John Wick&quot;
          </p>
        </div>
      </div>
    </main>
  );
};

export default SearchMessage;
