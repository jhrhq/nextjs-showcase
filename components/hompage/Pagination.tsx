import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const PropertyPagination = ({
  page,
  pageSize,
  totalItems,
}: {
  page: number;
  pageSize: number;
  totalItems: number;
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="mt-8 flex justify-center">
      <Pagination aria-label="Page navigation">
        <PaginationContent className="inline-flex items-center -space-x-px">
          {page > 1 ? (
            <PaginationItem>
              <PaginationLink
                href={`/?page=${page - 1}`}
                className={cn(
                  "block py-2 px-3 ml-0 leading-tight text-zinc-500 bg-white rounded-l-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700",
                  page > 1 && "pointer-events-none",
                )}
              >
                <span className="sr-only">Previous</span>
                <FaChevronLeft className="fas fa-chevron-left" />
              </PaginationLink>
            </PaginationItem>
          ) : null}
          {Array.from({ length: totalPages })
            .fill(1)
            .map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`/?page=${index + 1}`}
                  isActive={page == index + 1}
                  className="block py-2 px-3 leading-tight text-zinc-500 bg-white rounded-r-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 "
                >
                  <span className="sr-only">{index + 1}</span>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

          {page < totalPages ? (
            <PaginationItem>
              <PaginationLink
                href={`/?page=${page + 1}`}
                className="block py-2 px-3 leading-tight text-zinc-500 bg-white rounded-r-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700"
              >
                <span className="sr-only">Next</span>
                <FaChevronRight className="fas fa-chevron-right" />
              </PaginationLink>
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PropertyPagination;
