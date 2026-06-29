import videos from "@/app/apidata/apidata";
import { NextResponse } from "next/server";

export async function GET(_request, res) {
  const videoId = res.params.id;

  try {
    const video = videos.find((video) => video.videoId === videoId);
    return Response.json(video);
  } catch (err) {
    return NextResponse.json(
      { error: `Video with ${videoId} is not found` },
      { status: 400 }
    );
  }
}

export async function PATCH(request, res) {
  const videoId = res.params.id;
  const updatedData = await request.json();

  const { title, description } = updatedData;

  if (title === undefined || description === undefined) {
    return NextResponse.json(
      { error: " title and description must be provided" },
      { status: 400 }
    );
  }

  try {
    // Find the video to update
    const videoIndex = videos.findIndex((video) => video.videoId === videoId);

    if (videoIndex === -1) {
      return NextResponse.json(
        { error: `Video with id ${videoId} not found` },
        { status: 404 }
      );
    }

    // Update only the title and/or name of the video
    const updatedVideo = { ...videos[videoIndex] };

    if (title !== undefined) {
      updatedVideo.title = title;
    }
    if (description !== undefined) {
      updatedVideo.description = description;
    }

    videos[videoIndex] = updatedVideo;

    return NextResponse.json(updatedVideo);
  } catch (err) {
    return NextResponse.json(
      { error: "An error occurred while updating the video" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, res) {
  const videoId = res.params.id;

  try {
    const videoIndex = videos.findIndex((video) => video.videoId === videoId);

    if (videoIndex === -1) {
      return NextResponse.json(
        { error: `Video with id ${videoId} not found` },
        { status: 404 }
      );
    }

    const deletedVideo = videos.splice(videoIndex, 1)[0];

    return NextResponse.json({
      message: "Video deleted successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "An error occurred while deleting the video" },
      { status: 500 }
    );
  }
}
