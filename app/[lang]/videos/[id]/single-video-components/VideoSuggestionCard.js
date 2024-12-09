import Image from "next/image";

const VideoSuggestionCard = () => {
  return (
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
  );
};

export default VideoSuggestionCard;
