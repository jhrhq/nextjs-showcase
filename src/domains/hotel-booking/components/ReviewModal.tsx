"use client";
import { Rating } from "@/domains/hotel-booking/components/Rating";
import { Button } from "@/domains/hotel-booking/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/domains/hotel-booking/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/domains/hotel-booking/components/ui/form";
import { Textarea } from "@/domains/hotel-booking/components/ui/textarea";
import { type PropertyReview, ReviewInputSchema } from "@/domains/hotel-booking/validationSchema/review-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaX } from "react-icons/fa6";
import { clientFormErrorState, clientSuccessErrorState } from "@/domains/hotel-booking/utils/client-form-error";
import { FieldCustomError } from "./field-error";
import type { ReviewType } from "./property-details/ReviewContainer";
import type { Types } from "mongoose";
import { createReviewAction, getReviews } from "@/app/(nextjs)/hotel-booking/actions/reviewAction";

interface Props {
  propertyId: Types.ObjectId;
  userId: string;
  updateReviews: (reviews: ReviewType[]) => void;
}

const reviewFormDefaultValues = {
  comment: "",
  rating: 0,
  property: "",
  user: "",
  isBooked: false,
};

const ReviewModal = ({ propertyId, userId, updateReviews }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<PropertyReview>({
    resolver: zodResolver(ReviewInputSchema),
    defaultValues: reviewFormDefaultValues,
    values: { ...reviewFormDefaultValues, property: propertyId, user: userId },
  });
  const reload = async () => {
    try {
      const data = await getReviews({ propertyId });
      if (data) {
        updateReviews(data.reviews);
      }
    } catch (err) {
      console.log(err);
      // toast({
      //   variant: 'destructive',
      //   description: t('Error in fetching reviews'),
      // })
    }
  };

  async function onSubmit(values: PropertyReview) {
    try {
      const result = await createReviewAction({ data: values });
      if (result?.status) {
        setOpen(false);
        form.reset();
        await reload();
      }
      if (!result?.status) {
        clientSuccessErrorState(result?.message, form.setError);
      }
    } catch (error) {
      clientFormErrorState(error, form.setError);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 border border-primary rounded-lg hover:bg-gray-100" variant="outline">
          Write a Review
        </Button>
      </DialogTrigger>

      <DialogContent className=" bg-white ">
        <div className="border-b pb-4">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold text-gray-800">Write a review</DialogTitle>
            <DialogClose className=" text-gray-400 hover:text-gray-600 ">
              <FaX className="ph-x size-4 " />
            </DialogClose>
          </div>
        </div>

        <div className="p-4 pt-0">
          <DialogDescription className="hidden">Review Description</DialogDescription>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldCustomError errorMessage={form.formState?.errors?.root?.serverError?.message} />
              <div>
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-gray-700 font-medium mb-2 text-base">Overall Rating</FormLabel>
                      <FormControl>
                        <Rating {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-gray-700 font-medium mb-2 text-base">Your Review</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Share your experience with other travelers..."
                          className="w-full px-4 text-base py-3 rounded-lg border focus:border-gray-500 focus:ring-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="border-t pt-4 bg-gray-50">
                <div className="flex justify-end gap-4">
                  <DialogClose asChild>
                    <Button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg static" variant="ghost">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90">
                    Submit Review
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
