import Image from "next/image";
import { IPropertyDocument } from "../../models/Property.model";
import { Star } from "lucide-react";
import { Button } from "../ui/button";

type PaymentSummaryCardProps = {
  property: IPropertyDocument;
  totalNights: number;
};

export function PaymentSummaryCard({
  property,
  totalNights,
}: PaymentSummaryCardProps) {
  const { perNight, cleaningFee, serviceFee } = property.pricing;

  const accommodationCost = perNight * totalNights;
  const totalPrice = accommodationCost + cleaningFee + serviceFee;

  return (
    <div className="sticky top-0 mb-8 rounded-lg bg-white p-6 shadow-sm">
         <div className="mb-6 flex items-start gap-4">
           <Image
             src={property.images[0].url}
             alt={property.title}
             width={500}
             height={500}
             className="h-20 w-20 rounded-lg object-cover"
           />

           <div>
             <p className="font-bold">{property.title}</p>

             <div className="flex items-center">
               <Star
                 className="mr-1 size-4"
                 fill={property.reviewCount > 0 ? "currentColor" : undefined}
               />

               <span className="mt-1 text-xs text-zinc-500">
                 {property.ratingAvg} ({property.reviewCount}{" "}
                 {property.reviewCount === 1 ? "Review" : "Reviews"})
               </span>
             </div>

           </div>
         </div>

         <div className="border-t pt-4">
           <h3 className="mb-4 font-semibold">Price details</h3>

           <div className="space-y-3">
             <div className="flex justify-between">
               <span>
                 ${perNight} × {totalNights}{" "}
                 {totalNights === 1 ? "night" : "nights"}
               </span>
               <span>${accommodationCost}</span>
             </div>

             <div className="flex justify-between">
               <span>Cleaning fee</span>
               <span>${cleaningFee}</span>
             </div>

             <div className="flex justify-between">
               <span>Service fee</span>
               <span>${serviceFee}</span>
             </div>

             <div className="flex justify-between border-t pt-3 font-semibold">
               <span>Total (USD)</span>
               <span>${totalPrice}</span>
             </div>
           </div>
         </div>
       </div>
  );
}


export function YourTrip({stayDuration,totalGuests }:{stayDuration:string, totalGuests:string}) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Your trip</h2>
      {/* Dates */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium">Dates</h3>
          <p className="text-zinc-600 text-sm">{stayDuration}</p>
        </div>
        <Button variant="secondary" className="text-zinc-800 text-sm font-bold">Edit</Button>
      </div>
      {/* Guests */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Guests</h3>
          <p className="text-zinc-600 text-sm">{totalGuests}</p>
        </div>
        <Button variant="secondary" className="text-zinc-800 text-sm font-bold">Edit</Button>
      </div>
    </section>
  )
}
