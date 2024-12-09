import { Button } from "@/components/ui/button";
import Link from "next/link";

const FeaturedHeading = ({ dictionary }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold">{dictionary.streamToday}</h2>

      <Button
        className="bg-color-gray hover:bg-opacity-80 text-sm px-4 py-2 rounded-full h-auto "
        asChild
      >
        <Link href="#">{dictionary.viewAll}</Link>
      </Button>
    </div>
  );
};

export default FeaturedHeading;
