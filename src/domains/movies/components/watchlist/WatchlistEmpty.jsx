import { Archive } from "lucide-react";
import Link from "next/link";

const EmptyWatchList = () => {
  return (
    <div id="emptyState" className=" text-center py-16">
      <Archive className="h-24 w-24 mx-auto text-moviedb-gray mb-4" />

      <h2 className="text-2xl font-bold text-light mb-2">Your Watch Later list is empty</h2>
      <p className="text-light/70 mb-6">Explore movies and add them to your list to watch later</p>
      <Link href="/" className="bg-primary text-dark px-6 py-2 rounded-full hover:bg-primary/80 transition">
        Explore Movies
      </Link>
    </div>
  );
};

export default EmptyWatchList;
