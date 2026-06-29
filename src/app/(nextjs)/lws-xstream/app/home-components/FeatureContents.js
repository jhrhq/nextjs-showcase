import FeaturedContentCard from "@/app/home-components/FeaturedContentCard";

const FeatureContents = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <FeaturedContentCard key={video.videoId} {...video} />
      ))}
    </div>
  );
};

export default FeatureContents;
