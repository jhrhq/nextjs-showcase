"use client";
import Image from "next/image";

const Details = ({ title, description }) => {
  return (
    <div className="bg-zinc-800 p-3 rounded">
      <span className="text-gray-400">{title}:</span>
      <span className="float-right">{description}</span>
    </div>
  );
};

const CompareSelectedMovieCard = () => {
  return (
    <div className="bg-zinc-900 rounded-lg p-4 flex flex-col">
      <div className="flex justify-end mb-4">
        <button className="text-gray-400 hover:text-white">✕</button>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-2 h-full">
          <Image
            height={300}
            width={300}
            src="https://image.tmdb.org/t/p/original/yfK7zxNL63VWfluFuoUaJj5PdNw.jpg"
            alt="Snowden"
            className="w-full rounded-lg mb-4 object-contain max-h-full"
          />
          <h2 className="text-xl font-bold mb-2 text-center">Snowden</h2>
        </div>
        <div className="w-full space-y-4 col-span-3">
          <Details title={"Rating"} description={"7.1/10"} />

          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Release Year:</span>
            <span className="float-right">2016</span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Runtime:</span>
            <span className="float-right">134 min</span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Budget:</span>
            <span className="float-right">$40.0M</span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Revenue:</span>
            <span className="float-right">$37.4M</span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Genres:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                Drama{" "}
              </span>
              <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                History{" "}
              </span>
              <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                Crime{" "}
              </span>
              <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                Thriller
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareSelectedMovieCard;
