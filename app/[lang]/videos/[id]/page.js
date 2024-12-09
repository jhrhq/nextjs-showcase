import VideoFrame from "@/app/[lang]/videos/[id]/single-video-components/VideoFrame";
import VideoSuggestionCard from "@/app/[lang]/videos/[id]/single-video-components/VideoSuggestionCard";

import Image from "next/image";

const VideoDetailsPage = () => {
  return (
    <main className="flex flex-col lg:flex-row gap-6">
      <VideoFrame />

      <div className="lg:w-1/4">
        <h2 className="text-xl font-semibold mb-4">You may like</h2>
        <div className="space-y-4">
          <VideoSuggestionCard />
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
              className=" w-30 h-20 w- rounded object-cover"
            />
            <div>
              <h3 className="font-semibold">Top 10 BIGGEST OPEN WORLD Games</h3>
              <p className="text-sm text-gray-400">Lazy Assassin</p>
              <p className="text-sm text-gray-400">7,694M View now</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VideoDetailsPage;
