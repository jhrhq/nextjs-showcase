import { Info, MoveLeft } from "lucide-react";
import { Button } from "@/domains/hotel-booking/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium text-primary rounded-full bg-primary/5 dark:bg-gray-800">
            <Info className="rotate-180" />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Page not found</h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            The page you are looking for doesn't exist. Here are some helpful links:
          </p>
          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <Button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
              <MoveLeft />
              <span className="leading-0">Go back</span>
            </Button>
            <Button className="w-1/2 px-5 py-2 text-sm tracking-wide transition-colors duration-200 rounded-lg shrink-0 sm:w-auto  dark:hover:bg-blue-500 dark:bg-blue-600">
              Take me home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
