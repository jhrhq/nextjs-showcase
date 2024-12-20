import Navbar from "@/components/Navbar";
import WatchListCard from "@/components/watchlist/WatchListCard";
import EmptyWatchList from "@/components/watchlist/WatchlistEmpty";

const WatchList = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-24 pb-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white">Watch Later</h1>
          <p className="text-light/70 mt-2">
            Movies you&apos;ve saved to watch in the future
          </p>
        </header>
        <div
          id="watchLaterList"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {/* Movie Card Template */}
          <WatchListCard />
        </div>
        <EmptyWatchList />
      </div>
    </>
  );
};

export default WatchList;
