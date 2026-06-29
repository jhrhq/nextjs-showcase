import Image from "next/image";
import Link from "next/link";

const FeaturedContentCard = ({
  title,
  description,
  thumbnail,
  channelTitle,
  publishTime,
  videoId,
}) => {
  return (
    <Link
      href={`videos/${videoId}`}
      className="rounded-lg overflow-hidden bg-color-gray"
    >
      <Image
        height={160}
        width={500}
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-2">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-400">{channelTitle}</p>
      </div>
    </Link>
  );
};

export default FeaturedContentCard;
