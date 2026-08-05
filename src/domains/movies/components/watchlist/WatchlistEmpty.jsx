import { Archive } from "lucide-react";
import Link from "next/link";

const EmptyWatchList = () => {
  return (
    <div id="emptyState" className="flex flex-col items-center justify-center text-center py-24 px-4">
      <div className="p-5 rounded-full bg-secondary/60 border border-border mb-6 shadow-inner">
        <Archive className="h-12 w-12 text-muted-foreground" />
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">Your Watch Later list is empty</h2>
      <p className="text-sm font-medium text-muted-foreground max-w-sm mb-8">
        Explore movies and add them to your list to watch later.
      </p>

      <Link
        href="/"
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all shadow-md cursor-pointer"
      >
        Explore Movies
      </Link>
    </div>
  );
};

export default EmptyWatchList;
