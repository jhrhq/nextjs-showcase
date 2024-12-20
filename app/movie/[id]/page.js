import HomeSections from "@/components/landing/HomeSections";
import MovieCard from "@/components/landing/MovieCard";
import Navbar from "@/components/Navbar";

const Details = async ({ params: { id } }) => {
  return (
    <>
      <Navbar />
      {/* Movie Details Section */}
      <div id="movieDetails" className="min-h-screen pt-20 mb-8">
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <img
              src="https://image.tmdb.org/t/p/original/iR79ciqhtaZ9BE7YFA1HpCHQgX4.jpg"
              alt="Smile 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70" />
          </div>
          <div className="relative container mx-auto px-4 pt-32">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <img
                  src="https://image.tmdb.org/t/p/original/ht8Uv9QPv9y7K0RvUyJIaXOZTfd.jpg"
                  alt="Smile 2"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h1 className="text-4xl font-bold mb-4">Smile 2</h1>
                <div className="flex items-center mb-4 space-x-4">
                  <span className="text-green-500"> 24 November 2024 </span>
                  <span>| </span>
                  <span>127 min</span>
                </div>
                <p className="text-lg mb-6">
                  About to embark on a new world tour, global pop sensation Skye
                  Riley begins experiencing increasingly terrifying and
                  inexplicable events. Overwhelmed by the escalating horrors and
                  the pressures of fame, Skye is forced to face her dark past to
                  regain control of her life before it spirals out of control.
                </p>
                <div className="mb-6">
                  <h3 className="text-gray-400 mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      Horror{" "}
                    </span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      Mystery
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-gray-400 mb-2">Cast</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="text-center">
                      <img
                        src="https://image.tmdb.org/t/p/original/6OLe7TskbEvYpo36eITfX91VoCP.jpg"
                        alt="Naomi Scott"
                        className="w-24 h-24 rounded-full object-cover mb-2"
                      />
                      <p className="text-sm">Naomi Scott</p>
                    </div>
                    <div className="text-center">
                      <img
                        src="https://image.tmdb.org/t/p/original/44sxIdGtYN24R14OmnZbCpcd8J8.jpg"
                        alt="Rosemarie DeWitt"
                        className="w-24 h-24 rounded-full object-cover mb-2"
                      />
                      <p className="text-sm">Rosemarie DeWitt</p>
                    </div>
                    <div className="text-center">
                      <img
                        src="https://image.tmdb.org/t/p/original/j7Zub5J9PgCnsfgEC5QCr160JtH.jpg"
                        alt="Lukas Gage"
                        className="w-24 h-24 rounded-full object-cover mb-2"
                      />
                      <p className="text-sm">Lukas Gage</p>
                    </div>
                    <div className="text-center">
                      <img
                        src="https://image.tmdb.org/t/p/original/22JmiXEKoIHTKAdZaxOiS5wVHnM.jpg"
                        alt="Miles Gutierrez-Riley"
                        className="w-24 h-24 rounded-full object-cover mb-2"
                      />
                      <p className="text-sm">Miles Gutierrez-Riley</p>
                    </div>
                    <div className="text-center">
                      <img
                        src="https://image.tmdb.org/t/p/original/pGi9CnzEG4cLa2viUP89yvlPCyR.jpg"
                        alt="Peter Jacobson"
                        className="w-24 h-24 rounded-full object-cover mb-2"
                      />
                      <p className="text-sm">Peter Jacobson</p>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="text-center">
                      <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-file-plus"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                          <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                          <path d="M12 11l0 6" />
                          <path d="M9 14l6 0" />
                        </svg>
                        Add to Wacth List
                      </button>
                    </div>
                    <div className="text-center">
                      <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-checks"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M7 12l5 5l10 -10" />
                          <path d="M2 12l5 5m5 -5l5 -5" />
                        </svg>
                        Added to Wacth List
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-gray-400 mb-2">Share on social media</h3>
                  <div className="flex flex-wrap gap-4">
                    <button className="text-center cursor-pointer">
                      <img
                        src="http://facebook.com/favicon.ico"
                        alt="Facebook"
                        className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                      />
                      <p className="text-sm">Facebook</p>
                    </button>
                    <button className="text-center cursor-pointer">
                      <img
                        src="http://x.com/favicon.ico"
                        alt="Facebook"
                        className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                      />
                      <p className="text-sm">X</p>
                    </button>
                    <button className="text-center cursor-pointer">
                      <img
                        src="http://linkedin.com/favicon.ico"
                        alt="Facebook"
                        className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                      />
                      <p className="text-sm">Linkedin</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Similar Movies Section */}
      <div className="container mx-auto px-4 py-8">
        <HomeSections sectionTitle={"More Like This"}>
          <MovieCard />
        </HomeSections>
      </div>
    </>
  );
};

export default Details;
