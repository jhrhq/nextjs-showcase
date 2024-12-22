import { CheckCheck, FilePlus } from "lucide-react";

const WatchlistAction = () => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="text-center">
          <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg">
            <FilePlus />
            Add to Wacth List
          </button>
        </div>
        <div className="text-center">
          <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600">
            <CheckCheck />
            Added to Wacth List
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchlistAction;
