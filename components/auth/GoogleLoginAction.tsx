import { GoogleSvg } from "@/components/svg-component/GoogleSvg";
import { Button } from "@/components/ui/button";

const GoogleLoginAction = () => {
  return (
    <Button
      className="w-full h-auto text-base flex items-center justify-center border border-gray-300 rounded-full py-3 hover:bg-gray-50 transition [&_svg]:size-auto"
      variant="outline"
    >
      <GoogleSvg />
      Continue with Google
    </Button>
  );
};

export default GoogleLoginAction;
