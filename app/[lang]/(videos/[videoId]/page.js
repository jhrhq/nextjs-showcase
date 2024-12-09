import { getVideos } from "@/app/[lang]/database";
import VideoModal from "@/app/[lang]/videos/[videoId]/components/VideoModal";

const VideoViewModal = async ({ params: { videoId, lang } }) => {
  const data = await getVideos();
  const selectedVideo = data.find((vid) => vid.videoId == videoId);
  return <VideoModal {...selectedVideo} />;
};

export default VideoViewModal;
