"use client";
import Image from "next/image";
import type { TMDBMovieDetails } from "../../types/tmdb-movi-details.types";

type Props = TMDBMovieDetails & { description: string };

const SocialMedia = ({ title, description }: Props) => {
  const handleShare = (platform: string) => {
    const currentUrl = window.location.href;
    const text = title ? `${title}${description ? ` - ${description}` : ""}` : "";
    let shareUrl = "";

    switch (platform) {
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case "x":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Share on social media
      </h3>
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => handleShare("facebook")}
          className="flex flex-col items-center text-center cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary/80 flex items-center justify-center mb-1.5 border border-border group-hover:border-primary transition-colors shadow-sm">
            <Image
              height={100}
              width={100}
              src="/icons/facebook.png"
              alt="Facebook"
              className="w-5 h-5 object-contain"
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            Facebook
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleShare("x")}
          className="flex flex-col items-center text-center cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary/80 flex items-center justify-center mb-1.5 border border-border group-hover:border-primary transition-colors shadow-sm">
            <Image height={100} width={100} src="/icons/x.png" alt="X" className="w-5 h-5 object-contain" />
          </div>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            X
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleShare("linkedin")}
          className="flex flex-col items-center text-center cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary/80 flex items-center justify-center mb-1.5 border border-border group-hover:border-primary transition-colors shadow-sm">
            <Image
              height={100}
              width={100}
              src="/icons/linkedin.png"
              alt="LinkedIn"
              className="w-5 h-5 object-contain"
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            LinkedIn
          </span>
        </button>
      </div>
    </div>
  );
};

export default SocialMedia;
