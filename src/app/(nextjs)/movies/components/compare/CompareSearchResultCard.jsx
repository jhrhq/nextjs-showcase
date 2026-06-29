import Image from "next/image";

const CompareSearchResultCard = ({ title, poster_path, release_date }) => {
  return (
    <>
      <Image
        width={300}
        height={300}
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className="w-16 h-24 object-cover rounded"
      />
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-400">
          {" "}
          {release_date ? new Date(release_date).getFullYear() : "unknown"}
        </p>
      </div>
    </>
  );
};

export default CompareSearchResultCard;
