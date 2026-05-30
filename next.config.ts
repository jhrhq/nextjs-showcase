import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "/s2/favicons/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // Optional: pathname: '/**', // Allow all paths
      },
    ],
  },
};

const withNextIntl =
  createNextIntlPlugin();
  // {
  // experimental: {
  //   createMessagesDeclaration: "./../../../../json.en",
  // },
  // }
export default withNextIntl(nextConfig);
