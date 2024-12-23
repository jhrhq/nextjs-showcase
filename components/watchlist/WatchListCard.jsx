"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

async function sendRequest(url, { arg }) {
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

const WatchListCard = ({ poster_path, title, release_date, id, userId }) => {
  const { trigger, isMutating } = useSWRMutation("/api/watchlist", sendRequest);

  const handleRemoveWatchLater = async () => {
    if (!id || !userId) return;
    try {
      const result = await trigger({ id, userId } /* options */);
      if (result.message) {
        toast.success(result.message);
      }
    } catch (e) {
      // console.log(e);
      toast.error(e.message);
    }
  };
  return (
    <div className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative">
      <Image
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        height={450}
        width={500}
        alt={title}
        className="w-full h-[450px] object-cover"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h2 className="text-xl font-bold text-light mb-2">{title}</h2>
        <div className="flex justify-between items-center">
          <span className="text-primary">
            {" "}
            {release_date ? new Date(release_date).getFullYear() : "unknown"}
          </span>
          <button
            onClick={handleRemoveWatchLater}
            disabled={isMutating}
            className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchListCard;
