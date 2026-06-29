"use client";
import Image from "next/image";
// import { useRouter } from "next/router";

// https://x.com/intent/tweet?text=${text}: ${url}
// https://threads.net/intent/post?source=${url}&url=${url}&text=${text}: ${url}
// https://web.whatsapp.com/send?text=${text}: ${url}
// http://www.reddit.com/submit?url=${url}&title=${text}: ${url}
// https://t.me/share/url&text=${text}: ${url}
// https://www.facebook.com/sharer/share...{url}&quote=${text}: ${url}

const SocialMedia = ({ title, description }) => {
  // const router = useRouter();

  const handleShare = (platform) => {
    // Capture the current page URL
    const currentUrl = window.location.href;
    let shareUrl = "";

    // Determine the correct URL based on the platform
    switch (platform) {
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "x":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      default:
        break;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mb-6">
      <h3 className="text-gray-400 mb-2">Share on social media</h3>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => handleShare("facebook")}
          className="text-center cursor-pointer"
        >
          <Image
            height={100}
            width={100}
            src="/icons/facebook.png"
            alt="Facebook"
            className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
          />
          <p className="text-sm">Facebook</p>
        </button>
        <button
          onClick={() => handleShare("x")}
          className="text-center cursor-pointer"
        >
          <Image
            height={100}
            width={100}
            src="/icons/x.png"
            alt="x"
            className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
          />
          <p className="text-sm">X</p>
        </button>
        <button
          onClick={() => handleShare("linkedin")}
          className="text-center cursor-pointer"
        >
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
