import FeatureContents from "@/app/home-components/FeatureContents";
import FeaturedHeading from "@/app/home-components/FeaturedHeading";

const FeaturedSection = () => {
  return (
    <section className="mt-12">
      <FeaturedHeading />
      <FeatureContents />
    </section>
  );
};

export default FeaturedSection;
