const WatchList = () => {
  return (
    <>
      <nav className="fixed w-full z-50 bg-gradient-to-b from-black to-transparent">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <a href="./index.html" className="text-red-600 text-4xl font-bold">
              MOVIE DB
            </a>
            <div className="ml-8 space-x-4">
              <a href="./index.html" className="text-white hover:text-gray-300">
                Home
              </a>
              <a
                href="./compare.html"
                className="text-white hover:text-gray-300"
              >
                Compare Movies
              </a>
              <a
                href="./WatchList.html"
                className="text-white hover:text-gray-300"
              >
                Watch Later
              </a>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              id="searchInput"
              placeholder="Search movies..."
              className="bg-black bg-opacity-50 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
            />
            <div
              id="searchResults"
              className="absolute w-full mt-2 bg-black bg-opacity-90 rounded-lg hidden"
            />
          </div>
        </div>
      </nav>
      <div className="container mx-auto pt-24 pb-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white">Watch Later</h1>
          <p className="text-light/70 mt-2">
            Movies you've saved to watch in the future
          </p>
        </header>
        <div
          id="watchLaterList"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {/* Movie Card Template */}
          <div className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative">
            <img
              src="https://image.tmdb.org/t/p/original/pnXLFioDeftqjlCVlRmXvIdMsdP.jpg"
              alt="Armor"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h2 className="text-xl font-bold text-light mb-2">Armor</h2>
              <div className="flex justify-between items-center">
                <span className="text-primary">2010</span>
                <button className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition">
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative">
            <img
              src="https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"
              alt="Deadpool & Wolverine"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h2 className="text-xl font-bold text-light mb-2">
                Deadpool &amp; Wolverine
              </h2>
              <div className="flex justify-between items-center">
                <span className="text-primary">2024</span>
                <button className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition">
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative">
            <img
              src="https://image.tmdb.org/t/p/original/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg"
              alt="Movie Poster"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h2 className="text-xl font-bold text-light mb-2">
                The Wild Robot
              </h2>
              <div className="flex justify-between items-center">
                <span className="text-primary">2014</span>
                <button className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="emptyState" className="hidden text-center py-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-moviedb-gray mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          <h2 className="text-2xl font-bold text-light mb-2">
            Your Watch Later list is empty
          </h2>
          <p className="text-light/70 mb-6">
            Explore movies and add them to your list to watch later
          </p>
          <a
            href="#"
            className="bg-primary text-dark px-6 py-2 rounded-full hover:bg-primary/80 transition"
          >
            Explore Movies
          </a>
        </div>
      </div>
    </>
  );
};

export default WatchList;
