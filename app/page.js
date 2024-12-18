import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      {/* <!-- Navigation --> */}
      <Navbar />
      {/* Hero Section */}
      <div
        id="hero"
        classname="relative h-screen"
        style={{
          backgroundImage:
            'url("https://image.tmdb.org/t/p/original/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg")',
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black" />
        <div className="absolute bottom-0 left-0 p-12">
          <h1 id="heroTitle" className="text-5xl font-bold mb-4">
            Venom: The Last Dance
          </h1>
          <p id="heroOverview" className="text-lg max-w-2xl mb-4">
            Eddie and Venom are on the run. Hunted by both of their worlds and
            with the net closing in, the duo are forced into a devastating
            decision that will bring the curtains down on Venom and Eddie's last
            dance.
          </p>
          <button className="bg-white text-black px-8 py-2 rounded-lg font-bold hover:bg-opacity-80">
            ▶ Play
          </button>
        </div>
      </div>
      {/* Movie Sections */}
      <div className="container mx-auto px-4 py-8">
        {/* Trending Movies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
          <div
            id="trendingMovies"
            className="flex space-x-4 overflow-x-auto pb-4"
          >
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/ht8Uv9QPv9y7K0RvUyJIaXOZTfd.jpg"
                  alt="Smile 2"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    Smile 2
                  </h3>
                  <p className="text-primary text-xs">2023</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/c5Tqxeo1UpBvnAc3csUm7j3hlQl.jpg"
                  alt="Wicked"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    Wicked
                  </h3>
                  <p className="text-primary text-xs">2024</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg"
                  alt="Gladiator II"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    Gladiator II
                  </h3>
                  <p className="text-primary text-xs">2025</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/xFSIygDiX70Esp9dheCgGX0Nj77.jpg"
                  alt="Spellbound"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    Spellbound
                  </h3>
                  <p className="text-primary text-xs">2022</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/e9tyjbF2rugENtBolTtEhHOXgzD.jpg"
                  alt="Blitz"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    Blitz
                  </h3>
                  <p className="text-primary text-xs">2021</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/2qzcxDbtRpHlcte7Df7JLMK84N.jpg"
                  alt="The Piano Lesson"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    The Piano Lesson
                  </h3>
                  <p className="text-primary text-xs">2024</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/oeDNBgnlGF6rnyX1P1K8Vl2f3lW.jpg"
                  alt="We Live in Time"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    We Live in Time
                  </h3>
                  <p className="text-primary text-xs">2023</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/pnXLFioDeftqjlCVlRmXvIdMsdP.jpg"
                  alt="Armor"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    Armor
                  </h3>
                  <p className="text-primary text-xs">2022</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"
                  alt="Deadpool & Wolverine"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    Deadpool &amp; Wolverine
                  </h3>
                  <p className="text-primary text-xs">2024</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg"
                  alt="The Wild Robot"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    The Wild Robot
                  </h3>
                  <p className="text-primary text-xs">2023</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/lqoMzCcZYEFK729d6qzt349fB4o.jpg"
                  alt="The Substance"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    The Substance
                  </h3>
                  <p className="text-primary text-xs">2022</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg"
                  alt="Alien: Romulus"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    Alien: Romulus
                  </h3>
                  <p className="text-primary text-xs">2024</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg"
                  alt="Red One"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    Red One
                  </h3>
                  <p className="text-primary text-xs">2023</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"
                  alt="Gladiator"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    Gladiator
                  </h3>
                  <p className="text-primary text-xs">2000</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/cNtAslrDhk1i3IOZ16vF7df6lMy.jpg"
                  alt="Absolution"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    Absolution
                  </h3>
                  <p className="text-primary text-xs">2021</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/bx92hl70NUhojjO3eV6LqKllj4L.jpg"
                  alt="GTMAX"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    GTMAX
                  </h3>
                  <p className="text-primary text-xs">2025</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/m0SbwFNCa9epW1X60deLqTHiP7x.jpg"
                  alt="Moana 2"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    Moana 2
                  </h3>
                  <p className="text-primary text-xs">2024</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/4t80WORFWqDYf4BRwV2jrXNHJdN.jpg"
                  alt="The Merry Gentlemen"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    The Merry Gentlemen
                  </h3>
                  <p className="text-primary text-xs">2022</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/zciWal3a5QPjqqJAgmpHVLBlFMj.jpg"
                  alt="Joy"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">Joy</h3>
                  <p className="text-primary text-xs">2023</p>
                </div>
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/o8qtMeCskitW5QwSu6O1nP4jN6z.jpg"
                  alt="Out of My Mind"
                  className="w-full rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    Out of My Mind
                  </h3>
                  <p className="text-primary text-xs">2021</p>
                </div>
              </a>
            </div>
          </div>
        </section>
        {"{"}/* {/* Popular Movies */} */{"}"}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Popular on MOVIE DB</h2>
          <div
            id="popularMovies"
            className="flex space-x-4 overflow-x-auto pb-4"
          >
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/aosm8NMQ3UyoBVpSxyimorCQykC.jpg"
                  alt="Venom: The Last Dance"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg"
                  alt="The Wild Robot"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/l1175hgL5DoXnqeZQCcU3eZIdhX.jpg"
                  alt="Terrifier 3"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg"
                  alt="Gladiator II"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/ht8Uv9QPv9y7K0RvUyJIaXOZTfd.jpg"
                  alt="Smile 2"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/wIGJnIFQlESkC2rLpfA8EDHqk4g.jpg"
                  alt="Apocalypse Z: The Beginning of the End"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/2ZdnmSCPm3ZcLc0CcTYqRvoyJLE.jpg"
                  alt="Levels"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"
                  alt="Deadpool & Wolverine"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/lqoMzCcZYEFK729d6qzt349fB4o.jpg"
                  alt="The Substance"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/qbkAqmmEIZfrCO8ZQAuIuVMlWoV.jpg"
                  alt="Transformers One"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/3k8jv1kSAAc0rCfFGtWDDQL4dfK.jpg"
                  alt="Classified"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/c5Tqxeo1UpBvnAc3csUm7j3hlQl.jpg"
                  alt="Wicked"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg"
                  alt="Alien: Romulus"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/m0SbwFNCa9epW1X60deLqTHiP7x.jpg"
                  alt="Moana 2"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/jEvytxNa5mfW7VAUmDWsZtIdATc.jpg"
                  alt="OVERLORD: The Sacred Kingdom"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/ory8WuAqznTE7lfopTSymHpop2t.jpg"
                  alt="Heavenly Touch"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg"
                  alt="Red One"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/spWV1eRzlDxvai8LbxwAWR0Vst4.jpg"
                  alt="Arcadian"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/wWba3TaojhK7NdycRhoQpsG0FaH.jpg"
                  alt="Despicable Me 4"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/zw4kV7npGtaqvUxvJE9IdqdFsNc.jpg"
                  alt="The Count of Monte-Cristo"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
          </div>
        </section>
        {/* Top Rated Movies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Top Rated</h2>
          <div
            id="topRatedMovies"
            className="flex space-x-4 overflow-x-auto pb-4"
          >
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"
                  alt="The Shawshank Redemption"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
                  alt="The Godfather"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg"
                  alt="The Godfather Part II"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg"
                  alt="Schindler's List"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg"
                  alt="12 Angry Men"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg"
                  alt="Spirited Away"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/lfRkUr7DYdHldAqi3PwdQGBRBPM.jpg"
                  alt="Dilwale Dulhania Le Jayenge"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
                  alt="The Dark Knight"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg"
                  alt="The Green Mile"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
                  alt="Parasite"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"
                  alt="Pulp Fiction"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/vfJFJPepRKapMd5G2ro7klIRysq.jpg"
                  alt="Your Name."
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"
                  alt="The Lord of the Rings: The Return of the King"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg"
                  alt="The Wild Robot"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg"
                  alt="Forrest Gump"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg"
                  alt="The Good, the Bad and the Ugly"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/iAq0sq42vKTLneVGqHn1D4GzgrM.jpg"
                  alt="Seven Samurai"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg"
                  alt="GoodFellas"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg"
                  alt="Grave of the Fireflies"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
            <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <a href="details.html">
                <img
                  src="https://image.tmdb.org/t/p/original/gCI2AeMV4IHSewhJkzsur5MEp6R.jpg"
                  alt="Cinema Paradiso"
                  className="w-full rounded-lg"
                />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
