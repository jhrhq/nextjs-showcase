import "server-only";

const videos = () => import("./data/videos.json").then((m) => m.default);

export const getVideos = async () => videos();
