import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HeroArea = () => {
  return (
    <>
      <Card className="lg:col-span-2 border-0 bg-transparent shadow-none text-card-background">
        <CardHeader className="p-0">
          <CardTitle className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            PLAY, COMPETE,
            <br />
            FOLLOW POPULAR
            <br />
            STREAMERS
          </CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-gray-400 mb-8">
            The best streamers gather here to have a good time, be among us,
            join us!
          </p>
        </CardContent>
      </Card>

      <div className="lg:col-span-2">
        <div className="relative rounded-lg overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/0VtVPk7Zv9c"
            title="YouTube video player"
            className="w-full aspect-video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen=""
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4">
            <div className="text-right">
              <span className="bg-color-purple text-white px-2 py-1 rounded text-sm">
                COMING SOON
              </span>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">04:03</div>
              <p className="text-sm">Broadcast starts in</p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-400">
          Battle for the castle with Franck Jourdan and Eva703
        </p>
      </div>
    </>
  );
};

export default HeroArea;
