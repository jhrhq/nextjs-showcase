import Image from "next/image";

const VideoDetailsPage = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-8">
          <Image
            height={80}
            width={128}
            src="/logo.svg"
            alt="LWS Xstream Logo"
            className="h-6"
          />
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-color-purple font-semibold">
              TOP STREAMING
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              GAMES
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              TEAMS
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-color-gray rounded-full py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-color-purple"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute right-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {/* যেহেতু videos.json এ কোনো Avatar দেয়া নাই, সেহেতু আপনি যেকোনো র‍্যান্ডম Avatar ব্যবহার করতে পারবেন */}
          <Image
            height={80}
            width={128}
            src="/avatar.png"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </header>
      <main className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4">
          <div className="relative">
            <iframe
              src="https://www.youtube.com/embed/hecODa5ZgZM"
              title="YouTube video player"
              frameBorder={0}
              className="w-full aspect-video h-[500px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen=""
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <div className="flex items-center space-x-4">
                <button className="bg-color-gray hover:bg-opacity-80 rounded-full p-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <div className="bg-color-purple text-white px-2 py-1 rounded text-sm">
                  LIVE
                </div>
                <span className="text-sm">46:02</span>
                <button className="bg-color-purple hover:bg-opacity-80 text-white px-4 py-1 rounded-full text-sm">
                  Donate
                </button>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-4">
            GTA V : BATMAN WAS KIDNAPPED || GTA V Bangla GAMEPLAY || Professor
            Of Pc Gaming
          </h1>
          <div className="flex items-center space-x-4 mt-2">
            {/* যেহেতু videos.json এ কোনো Avatar দেয়া নাই, সেহেতু আপনি যেকোনো র‍্যান্ডম Avatar ব্যবহার করতে পারবেন */}
            <Image
              height={80}
              width={128}
              src="/avatar.png"
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">Professor Of Pc Gaming</p>
            </div>
            <button className="bg-color-purple hover:bg-opacity-80 text-white px-4 py-1 rounded-full text-sm ml-auto">
              Subscribe
            </button>
          </div>
        </div>
        <div className="lg:w-1/4">
          <h2 className="text-xl font-semibold mb-4">You may like</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Image
                height={80}
                width={128}
                src="https://i.ytimg.com/vi/9kjwMTj8ZD0/hqdefault.jpg"
                alt="Fallout Shelter PC Thumbnail"
                className="w-30 h-20 rounded object-cover"
              />
              <div>
                <h3 className="font-semibold">Fallout Shelter PC - Ep. 1</h3>
                <p className="text-sm text-gray-400">Blitz</p>
                <p className="text-sm text-gray-400">26,389M</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Image
                height={80}
                width={128}
                src="https://i.ytimg.com/vi/Ij7FWQJR0e8/hqdefault.jpg"
                alt="Resident Evil Remastered Thumbnail"
                className="w-30 h-20 rounded object-cover"
              />
              <div>
                <h3 className="font-semibold">
                  Resident Evil Remastered Walkthrough
                </h3>
                <p className="text-sm text-gray-400">theRadBrad</p>
                <p className="text-sm text-gray-400">16,426M View now</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Image
                height={80}
                width={128}
                src="https://i.ytimg.com/vi/F8BactAXOH4/hqdefault.jpg"
                alt="Open World Games Thumbnail"
                className="afsdsf w-30 h-20 w- rounded object-cover"
              />
              <div>
                <h3 className="font-semibold">
                  Top 10 BIGGEST OPEN WORLD Games
                </h3>
                <p className="text-sm text-gray-400">Lazy Assassin</p>
                <p className="text-sm text-gray-400">7,694M View now</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoDetailsPage;
