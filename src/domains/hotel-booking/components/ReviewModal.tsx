"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/domains/hotel-booking/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/domains/hotel-booking/components/ui/dialog";
import { Textarea } from "@/domains/hotel-booking/components/ui/textarea";
import { type PropertyReview, ReviewInputSchema } from "@/domains/hotel-booking/validationSchema/review.schema";
import { cn } from "@/lib/utils";
import { createReviewAction } from "../actions/reviewAction";
import { bindFormErrors } from "../utils/form-helpers";

interface Props {
  propertyId: string;
  bookingId?: string;
  isCurrentUserReview: boolean;
}

const FORM_ID = "review-form";

const ReviewModal = ({ propertyId, bookingId, isCurrentUserReview }: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const form = useForm<PropertyReview>({
    resolver: zodResolver(ReviewInputSchema),
    defaultValues: {
      propertyId,
      bookingId,
      comment: "",
      overallRating: 5,
    },
  });

  async function onSubmit(values: PropertyReview) {
    try {
      const res = await createReviewAction({ ...values, path: pathname });
      if (res.success) {
        setOpen(false);
        toast.success(res.message);
      } else {
        bindFormErrors(form.setError, res);
      }
    } catch (error) {
      bindFormErrors(form.setError, null, error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={!bookingId || isCurrentUserReview}
          className="px-4 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
          variant="outline"
        >
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white pt-6 px-0">
        <div className="border-b pb-4 px-6">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold text-gray-800">Write a review</DialogTitle>
          </div>
        </div>

        <div className="px-6 py-4 pt-0">
          <DialogDescription className="hidden">Review Description</DialogDescription>

          <form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                control={form.control}
                name="overallRating"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-700 font-medium mb-2 text-base">Overall Rating</FieldLabel>
                    <div className="flex items-center gap-1 cursor-pointer">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "size-6",
                            star <= field.value ? "text-yellow-500 fill-yellow-500" : "text-gray-300 fill-gray-300"
                          )}
                          onClick={() => field.onChange(star)}
                        />
                      ))}
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="comment"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`${FORM_ID}-comment`} className="text-gray-700 font-medium mb-2 text-base">
                      Your Review
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id={`${FORM_ID}-comment`}
                      rows={4}
                      placeholder="Share your experience with other travelers..."
                      className="h-auto w-full px-4 text-base py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldError errors={[form.formState?.errors?.root?.serverError]} />
          </form>
        </div>

        <DialogFooter className="border-t pt-4 -mx-px px-6">
          <Button
            onClick={() => setOpen(false)}
            type="button"
            variant="ghost"
            className="px-4 py-2 rounded-lg hover:brightness-100 text-gray-600 hover:cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form={FORM_ID}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90 hover:cursor-pointer"
          >
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
