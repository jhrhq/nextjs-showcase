import FeaturedContentCard from "@/app/home-components/FeaturedContentCard";
import Image from "next/image";

const FeatureContents = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <FeaturedContentCard />

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
  );
};

export default FeatureContents;
