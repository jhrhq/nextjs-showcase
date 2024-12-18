const SearchResult = () => {
  return (
    <>
      <nav className="fixed w-full z-50 bg-black">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <a href="index.html" className="text-red-600 text-4xl font-bold">
              MOVIE DB
            </a>
            <div className="ml-8 space-x-4">
              <a href="index.html" className="text-white hover:text-gray-300">
                Home
              </a>
              <a href="compare.html" className="text-white hover:text-gray-300">
                Compare Movies
              </a>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              id="searchInput"
              defaultValue="Avatar"
              className="bg-zinc-900 text-white px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Search Stats */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Search Results for "Avatar"</h1>
          <p className="text-gray-400">Found 48 results</p>
        </div>
        {/* Filters and Sort Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Movie Card 1 */}
          <a
            href="details.html"
            className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src="https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
              alt="Avatar: The Way of Water"
              className="w-full aspect-[2/3] object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold mb-2">Avatar: The Way of Water</h3>
              <div className="flex justify-between text-sm text-gray-400">
                <span>2022</span>
                <span>⭐ 7.7</span>
              </div>
            </div>
          </a>
          {/* Movie Card 2 */}
          <a
            href="details.html"
            className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src="https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg"
              alt="Avatar"
              className="w-full aspect-[2/3] object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold mb-2">Avatar</h3>
              <div className="flex justify-between text-sm text-gray-400">
                <span>2009</span>
                <span>⭐ 7.6</span>
              </div>
            </div>
          </a>
          {/* Movie Card 3 */}
          <a
            href="details.html"
            className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src="https://image.tmdb.org/t/p/w500/kSf9svfL2WrKeuK8W08xeR5lTn8.jpg"
              alt="Avatar: The Deep Dive"
              className="w-full aspect-[2/3] object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold mb-2">Avatar: The Deep Dive</h3>
              <div className="flex justify-between text-sm text-gray-400">
                <span>2023</span>
                <span>⭐ 7.3</span>
              </div>
            </div>
          </a>
          {/* Add more dummy results as needed */}
        </div>
      </main>
    </>
  );
};

export default SearchResult;
