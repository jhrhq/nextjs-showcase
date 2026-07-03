const SearchHeader = ({ text, movieLength = 0 }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">Search Results for &quot;{text}&quot;</h1>
      <p className="text-gray-400">Found {movieLength} results</p>
    </div>
  );
};

export default SearchHeader;
