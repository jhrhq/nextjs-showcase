"use client";
import { format } from "date-fns";
import { Home } from "lucide-react";
import { CSVLink } from "react-csv";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const headers = [
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  { label: "Email", key: "email" },
];

const data = [
  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
];
const fname = `thisssssss is the name ${format(new Date(2014, 6, 2), "MM/dd/yyyy")}`;

export default function Test() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">
          <CSVLink
            filename={fname}
            data={data}
            headers={headers}
            style={{ backgroundColor: "deepskyblue" }}
          >
            Download me <Home />
          </CSVLink>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  );
}
