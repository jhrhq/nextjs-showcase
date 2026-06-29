import videos from "@/app/apidata/apidata";

export async function GET() {
  return Response.json(videos);
}
