import Image from "next/image";

const SocialMedia = () => {
  return (
    <div className="mb-6">
      <h3 className="text-gray-400 mb-2">Share on social media</h3>
      <div className="flex flex-wrap gap-4">
        <button className="text-center cursor-pointer">
          <Image
            height={100}
            width={100}
            src="/icons/facebook.png"
            alt="Facebook"
            className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
          />
          <p className="text-sm">Facebook</p>
        </button>
        <button className="text-center cursor-pointer">
          <Image
            height={100}
            width={100}
            src="/icons/x.png"
            alt="x"
            className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
          />
          <p className="text-sm">X</p>
        </button>
        <button className="text-center cursor-pointer">
          <Image
            height={100}
            width={100}
            src="/icons/linkedin.png"
            alt="linkedin"
            className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
          />
          <p className="text-sm">Linkedin</p>
        </button>
      </div>
    </div>
  );
};

export default SocialMedia;
