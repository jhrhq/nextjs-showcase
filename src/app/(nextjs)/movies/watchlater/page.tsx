import Navbar from "@/domains/movies/components/Navbar";
import WatchLaterUsersLogInCheck from "@/domains/movies/components/watch-later/WatchLaterUsersLogInCheck";

const WatchList = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-24 pb-8">
        <WatchLaterUsersLogInCheck />
      </div>
    </>
  );
};

export default WatchList;
