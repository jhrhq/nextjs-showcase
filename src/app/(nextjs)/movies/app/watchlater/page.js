import WatchLaterUsersLogInCheck from "@/app/_components/_watch-later/WatchLaterUsersLogInCheck";
import Navbar from "@/components/Navbar";

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
