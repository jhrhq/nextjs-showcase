"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/domains/hotel-booking/components/ui/button";
import { Calendar } from "@/domains/hotel-booking/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/domains/hotel-booking/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/domains/hotel-booking/components/ui/popover";
import Link from "next/link";

const FormSchema = z.object({
  checkin: z.date({
    message: "A date of birth is required.",
  }),
  checkout: z.date({
    message: "A date of birth is required.",
  }),
  guests: z.coerce.number().int().min(1, "Guests must be at least 1").max(6, "Guests must be at most 6"),
});

export function BookingCardForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      guests: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="checkin"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(" pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Check In</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkout"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(" pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Check Out</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input {...field} placeholder="Guests" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button
          type="submit"
          className="w-full block md:text-base text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
          asChild
        >
          <Link href={"/payment-process"}>Reserve</Link>
        </Button>
      </form>
      <div className="text-center mt-4 text-gray-600">
        <p>You won&apos;t be charged yet</p>
      </div>
    </Form>
  );
}
