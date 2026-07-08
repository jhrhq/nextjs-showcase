"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { type FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createReviewAction, getReviews } from "@/domains/hotel-booking/actions/reviewAction";
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
import { Field, FieldError, FieldGroup, FieldLabel } from "@/domains/hotel-booking/components/ui/field";
import { Textarea } from "@/domains/hotel-booking/components/ui/textarea";
import { type PropertyReview, ReviewInputSchema } from "@/domains/hotel-booking/validationSchema/review-schema";
import type { ReviewType } from "./property-details/ReviewContainer";
import { InputGroup } from "@/components/ui/input-group";

interface Props {
  propertyId: string;
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

const ReviewModal: FC<Props> = ({ propertyId, userId, updateReviews }) => {
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
    } catch (error) {
      console.log(error);
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
              <X className="ph-x size-4 " />
            </DialogClose>
          </div>
        </div>

        <div className="p-4 pt-0">
          <DialogDescription className="hidden">Review Description</DialogDescription>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <Field className="w-full">
                    <FieldLabel className="text-gray-700 font-medium mb-2 text-base">Overall Rating</FieldLabel>
                    <InputGroup>
                      <Rating {...field} />
                    </InputGroup>
                    <FormMessage />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <Field className="w-full">
                    <FieldLabel className="text-gray-700 font-medium mb-2 text-base">Your Review</FieldLabel>
                    <InputGroup>
                      <Textarea
                        {...field}
                        rows={4}
                        placeholder="Share your experience with other travelers..."
                        className="w-full px-4 text-base py-3 rounded-lg border focus:border-gray-500 focus:ring-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </InputGroup>
                    <FormMessage />
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldError errors={[form.formState?.errors?.root?.serverError]} />
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
