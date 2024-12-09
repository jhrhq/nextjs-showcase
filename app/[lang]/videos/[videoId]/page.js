import { getVideos } from "@/app/[lang]/database";
import VideoFrame from "@/app/[lang]/videos/[videoId]/components/VideoFrame";
import VideoSuggestionCard from "@/app/[lang]/videos/[videoId]/components/VideoSuggestionCard";

const VideoDetailsPage = async ({ params: { videoId, lang } }) => {
  const data = await getVideos();
  const getCurrentVideo = data.find((vid) => vid.videoId == videoId);
  const suggestedVideos = data.slice(0, 3);

  return (
    <main className="flex flex-col lg:flex-row gap-6">
      <VideoFrame {...getCurrentVideo} />

      <div className="lg:w-1/4">
        <h2 className="text-xl font-semibold mb-4">You may like</h2>
        <div className="space-y-4">
          {suggestedVideos.map((vid) => (
            <VideoSuggestionCard key={vid.videoId} {...vid} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default VideoDetailsPage;
