import FeatureContents from "@/app/home-components/FeatureContents";
import FeaturedHeading from "@/app/home-components/FeaturedHeading";

const FeaturedSection = ({ data }) => {
  return (
    <section className="mt-12">
      <FeaturedHeading />
      <FeatureContents videos={data} />
    </section>
  );
};

export default FeaturedSection;
