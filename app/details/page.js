const Details = () => {
  return (
    <>
      <nav className="fixed w-full z-50 bg-gradient-to-b from-black to-transparent">
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
        </div>
      </nav>
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
        <h2 className="text-2xl font-bold mb-4">More Like This</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          <div className="flex w-48 h-[288px] rounded-lg cursor-pointer hover:scale-105 transition-transform">
            <div className="w-48 h-[288px] rounded-lg bg-zinc-800 relative">
              <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
                <div className="animate-pulse w-full h-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite]" />
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/3LjHC2CWDkzoiPehf3GViujws0.jpg"
                alt="The Good German"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/x21s3p5wPww534nYj1cWakTcqz4.jpg"
                alt="Lucky Number Slevin"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/5GjUN65VjfqClVDMF0o1mT471U2.jpg"
                alt="Las Poquianchis"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/w9RaPHov8oM5cnzeE27isnFMsvS.jpg"
                alt="Ghost"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/hlBm0wromGeiFBGlV7RzjwQBPbw.jpg"
                alt="Secret Beyond the Door..."
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/vPYgvd2MwHlxTamAOjwVQp4qs1W.jpg"
                alt="Constantine"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/gghD2ZIPjMzLnnBuT3AZQGYnIW9.jpg"
                alt="The Ring"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/xqS5Y8f6EQy9i9YFuPuTlPRopV4.jpg"
                alt="Next Door"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/4SFvqrlSigAt9tnhXFSMyKeJWQk.jpg"
                alt="Frenzy"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/cN3ijEwsn4kBaRuHfcJpAQJbeWe.jpg"
                alt="Jaws 2"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/ebYw9tR0iqBzDGA6HVBhtd2xJM3.jpg"
                alt="Jaws: The Revenge"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/r0bEDWO2w4a43K2xTNSF284qOsc.jpg"
                alt="Silent Hill"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/pgqj7QoBPWFLLKtLEpPmFYFRMgB.jpg"
                alt="Solaris"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/rxw9l9YNL14ODdmAavUwHLBjiDo.jpg"
                alt="The Ninth Gate"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/h5v3wjJQNB7q2RntEnKDLhKtTFE.jpg"
                alt="Angel Heart"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/fdTtij6H0sX9AzIjUeynh5zbfm7.jpg"
                alt="Lost Highway"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/oXC0suIkn6GiyDaBj7h0AUzunKA.jpg"
                alt="Microwave Coven"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/zK0aepoaWGk6AsUFb0DY0AKvzTE.jpg"
                alt="Eulogy for a Vampire"
                className="w-full rounded-lg"
              />
            </a>
          </div>
          <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
            <a href="details.html">
              <img
                src="https://image.tmdb.org/t/p/original/wGP0nlI4rFI564wUY9mzxrk7rwN.jpg"
                alt="Worm Detective: The Worm is the Detective"
                className="w-full rounded-lg"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
