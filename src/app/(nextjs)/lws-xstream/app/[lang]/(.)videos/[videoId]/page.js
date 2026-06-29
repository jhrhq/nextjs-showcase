import { getVideos } from "@/app/[lang]/database";
import { getDictionary } from "@/app/[lang]/dictionaries";
import VideoModal from "@/app/[lang]/videos/[videoId]/components/VideoModal";

const VideoViewModal = async ({ params: { videoId, lang } }) => {
  const dictionary = await getDictionary(lang);
  const data = await getVideos();
  const selectedVideo = data.find((vid) => vid.videoId == videoId);
  return <VideoModal {...selectedVideo} dictionary={dictionary} />;
};

export default VideoViewModal;
