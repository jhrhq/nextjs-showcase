import { FieldPath, useFormContext } from "react-hook-form";

import { PropertyReview } from "@/validationSchema/review-schema";
import { forwardRef } from "react";
import { FaStar } from "react-icons/fa6";

type RatingProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Rating = forwardRef<HTMLInputElement, RatingProps>(
  (props, ref) => {
    const name = props.name as FieldPath<PropertyReview>;
    const { register, setValue, getValues } = useFormContext<PropertyReview>();
    return (
      <div className="flex gap-2">
        <input
          {...props}
          className="hidden invisible"
          {...register(name)}
          ref={ref}
        />
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <FaStar
              key={i}
              className={`text-2xl cursor-pointer ${
                i < +getValues(name) ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() =>
                setValue(name, i === +getValues(name) - 1 ? 0 : i + 1)
              }
            />
          ))}
      </div>
    );
  }
);
Rating.displayName = "Rating";
