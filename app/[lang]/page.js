import Image from "next/image";

export default async function Home() {
  // const dictionary = await getDictionary("bn");
  return (
    <div className="container mx-auto px-4 py-4">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-8">
          <Image
            height={160}
            width={500}
            src="/logo.svg"
            alt="LWS Xstream Logo"
            className="h-6"
          />
          <nav className=" hidden md:flex space-x-6">
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
            height={160}
            width={500}
            src="/avatar.png"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
        <div className="lg:col-span-2">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            PLAY, COMPETE,
            <br />
            FOLLOW POPULAR
            <br />
            STREAMERS
          </h1>
          <p className="text-gray-400 mb-8">
            The best streamers gather here to have a good time, be among us,
            join us!
          </p>
        </div>
        <div className="lg:col-span-2">
          <div className="relative rounded-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/0VtVPk7Zv9c"
              title="YouTube video player"
              frameBorder={0}
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen=""
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4">
              <div className="text-right">
                <span className="bg-color-purple text-white px-2 py-1 rounded text-sm">
                  COMING SOON
                </span>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">04:03</div>
                <p className="text-sm">Broadcast starts in</p>
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Battle for the castle with Franck Jourdan and Eva703
          </p>
        </div>
      </main>
      <section className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Streams of the day</h2>
          <a
            href="#"
            className="bg-color-gray hover:bg-opacity-80 text-sm px-4 py-2 rounded-full"
          >
            View all
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg overflow-hidden bg-color-gray">
            <Image
              height={160}
              width={500}
              src="https://i.ytimg.com/vi/9kjwMTj8ZD0/hqdefault.jpg"
              alt="Stream 1"
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <p className="font-semibold">
                Fallout Shelter PC - Ep. 1 - Fallout Shelter Vault #314
              </p>
              <p className="text-sm text-gray-400">Blitz</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden bg-color-gray">
            <Image
              height={160}
              width={500}
              src="https://i.ytimg.com/vi/Ij7FWQJR0e8/hqdefault.jpg"
              alt="Stream 2"
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <p className="font-semibold">
                Resident Evil Remastered Walkthrough Gameplay Part 1
              </p>
              <p className="text-sm text-gray-400">theRadBrad</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden bg-color-gray">
            <Image
              height={160}
              width={500}
              src="https://i.ytimg.com/vi/F8BactAXOH4/hqdefault.jpg"
              alt="Stream 3"
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <p className="font-semibold">
                Top 10 *BIGGEST* OPEN WORLD Games Ever Made
              </p>
              <p className="text-sm text-gray-400">Lazy Assassin</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden bg-color-gray">
            <Image
              height={160}
              width={500}
              src="https://i.ytimg.com/vi/laV-GvMFuaM/hqdefault.jpg"
              alt="Stream 4"
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <p className="font-semibold">
                How to setup a Logitech G29 steering wheel on a PC
              </p>
              <p className="text-sm text-gray-400">Geek Street</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden bg-color-gray">
            <Image
              height={160}
              width={500}
              src="https://i.ytimg.com/vi/XPxGL3m-Dl0/hqdefault.jpg"
              alt="Stream 5"
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <p className="font-semibold">
                $350 FULL PC Gaming Setup and How To Upgrade It Over Time!
              </p>
              <p className="text-sm text-gray-400">Zach's Tech Turf</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden bg-color-gray">
            <Image
              height={160}
              width={500}
              src="https://i.ytimg.com/vi/C9JuJobvxpg/hqdefault.jpg"
              alt="Stream 6"
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <p className="font-semibold">
                [B2K] THE KING IS OFFICIALLY BACK | 25 KILLS GAMEPLAY
              </p>
              <p className="text-sm text-gray-400">Born2Kill</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden bg-color-gray">
            <Image
              height={160}
              width={500}
              src="https://i.ytimg.com/vi/_57g8xCY_v4/hqdefault.jpg"
              alt="Stream 7"
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <p className="font-semibold">
                FIFA 22 PC Gameplay (i5 9300H &amp; RTX 2060)
              </p>
              <p className="text-sm text-gray-400">Nad Noddy</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden bg-color-gray">
            <Image
              height={160}
              width={500}
              src="https://i.ytimg.com/vi/7bMOVNwut7c/hqdefault.jpg"
              alt="Stream 8"
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <p className="font-semibold">
                Build gaming PC with ⌨️ 🖱full setup | bugged gaming 8gb graphics
              </p>
              <p className="text-sm text-gray-400">BISWAS GAMER</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
