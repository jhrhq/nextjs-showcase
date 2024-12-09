import { getVideos } from "@/app/[lang]/database";
import { getDictionary } from "@/app/[lang]/dictionaries";
import FeaturedSection from "@/app/home-components/FeaturedSection";
import HeroArea from "@/app/home-components/HeroArea";

export default async function Home() {
  const dictionary = await getDictionary("bn");
  const data = await getVideos();
  return (
    <>
      <main className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
        <HeroArea />
      </main>
      <FeaturedSection data={data} />
    </>
  );
}
