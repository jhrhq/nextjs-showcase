"use client";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { removeFromWatchListAction } from "@/domains/movies/actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-destructive text-primary-foreground hover:bg-destructive/90 px-3 py-1.5 rounded-md text-xs font-medium transition-colors shadow-sm cursor-pointer disabled:pointer-events-none disabled:opacity-50"
    >
      {pending ? "Removing..." : "Remove"}
    </button>
  );
};

const WatchListCard = ({ poster_path, title, release_date, id, userId }) => {
  const handleRemoveWithArgs = removeFromWatchListAction.bind(null, id, userId);

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative w-full aspect-2/3 overflow-hidden bg-muted">
        <Image
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          height={450}
          width={500}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h2 className="text-base font-semibold text-foreground mb-1 tracking-tight line-clamp-1">{title}</h2>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs font-medium text-muted-foreground">
              {release_date ? new Date(release_date).getFullYear() : "Unknown"}
            </span>

            <form action={handleRemoveWithArgs}>
              <SubmitButton />
            </form>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between grow bg-card">
        <h3 className="font-semibold text-sm text-foreground mb-1 truncate">{title}</h3>
        <span className="text-xs font-medium text-muted-foreground">
          {release_date ? new Date(release_date).getFullYear() : "Unknown"}
        </span>
      </div>
    </div>
  );
};

export default WatchListCard;
