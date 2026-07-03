import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/domains/hotel-booking/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PropertyPagination = ({ page, pageSize, totalItems }: { page: number; pageSize: number; totalItems: number }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="mt-8 flex justify-center">
      <Pagination aria-label="Page navigation">
        <PaginationContent className="inline-flex items-center -space-x-px">
          <PaginationItem>
            <PaginationLink
              href={`/?page=${page - 1}`}
              className={cn(page <= 1 && "pointer-events-none text-zinc-400")}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="fas fa-chevron-left" />
            </PaginationLink>
          </PaginationItem>

          {Array.from({ length: totalPages })
            .fill(1)
            .map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink href={`/?page=${index + 1}`} isActive={page == index + 1}>
                  <span className="sr-only">{index + 1}</span>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

          <PaginationItem>
            <PaginationLink
              href={`/?page=${page + 1}`}
              className={cn(page >= totalPages && "pointer-events-none text-zinc-400")}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="fas fa-chevron-right" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PropertyPagination;
