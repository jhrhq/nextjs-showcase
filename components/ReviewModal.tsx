"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaStar, FaX } from "react-icons/fa6";

const ReviewModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="px-4 py-2 border border-primary rounded-lg hover:bg-gray-100"
          variant="outline"
        >
          Write a Review
        </Button>
      </DialogTrigger>

      <DialogContent className=" bg-white ">
        <div className="border-b pb-4">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold text-gray-800">
              Write a review
            </DialogTitle>
            <DialogClose className=" text-gray-400 hover:text-gray-600 ">
              <FaX className="ph-x size-4 " />
            </DialogClose>
          </div>
        </div>

        <div className="p-4 pt-0">
          <DialogDescription className="hidden">
            Review Description
          </DialogDescription>
          <form className="space-y-6">
            {/* Overall Rating */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Overall Rating
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
                >
                  <FaStar className="fas fa-star" />
                </button>
                <button
                  type="button"
                  className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
                >
                  <FaStar className="fas fa-star" />
                </button>
                <button
                  type="button"
                  className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
                >
                  <FaStar className="fas fa-star" />
                </button>
                <button
                  type="button"
                  className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
                >
                  <FaStar className="fas fa-star" />
                </button>
                <button
                  type="button"
                  className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
                >
                  <FaStar className="fas fa-star" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Review
              </label>
              <textarea
                rows={4}
                placeholder="Share your experience with other travelers..."
                className="w-full px-4 py-3 rounded-lg border focus:border-gray-500 focus:ring-0 resize-none"
                defaultValue={""}
              />
            </div>
          </form>
        </div>
        <DialogFooter className="border-t pt-4 bg-gray-50">
          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg static"
                variant="ghost"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90">
              Submit Review
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;

//  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
// <div className="bg-white rounded-2xl w-full max-w-xl mx-4 overflow-hidden">

//   <div className="border-b p-4">
//     <div className="flex justify-between items-center">
//       <h3 className="text-xl font-semibold">Write a review</h3>
//       <button className="text-gray-400 hover:text-gray-600">
//         <i className="fas fa-times text-xl" />
//       </button>
//     </div>
//   </div>

//   <div className="p-6">
//     <form className="space-y-6">

//       <div>
//         <label className="block text-gray-700 font-medium mb-2">
//           Overall Rating
//         </label>
//         <div className="flex gap-2">
//           <button
//             type="button"
//             className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
//           >
//             <FaStar className="fas fa-star" />
//           </button>
//           <button
//             type="button"
//             className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
//           >
//             <FaStar className="fas fa-star" />
//           </button>
//           <button
//             type="button"
//             className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
//           >
//             <FaStar className="fas fa-star" />
//           </button>
//           <button
//             type="button"
//             className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
//           >
//             <FaStar className="fas fa-star" />
//           </button>
//           <button
//             type="button"
//             className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
//           >
//             <FaStar className="fas fa-star" />
//           </button>
//         </div>
//       </div>

//       <div>
//         <label className="block text-gray-700 font-medium mb-2">
//           Your Review
//         </label>
//         <textarea
//           rows={4}
//           placeholder="Share your experience with other travelers..."
//           className="w-full px-4 py-3 rounded-lg border focus:border-gray-500 focus:ring-0 resize-none"
//           defaultValue={""}
//         />
//       </div>
//     </form>
//   </div>

//   <div className="border-t p-4 bg-gray-50">
//     <div className="flex justify-end gap-4">
//       <button
//         className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"

//       >
//         Cancel
//       </button>
//       <button className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90">
//         Submit Review
//       </button>
//     </div>
//   </div>
// </div>
// </div>
