"use client";

import type { Row, Table } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  useRemoveCustomNetworkCollectionNestedLink,
  useUpdateCustomNetworkNestedLink,
} from "@/domains/linker/hooks/use-projects";
import {
  CustomNetworkCollectionNestedPayloadSchema,
  type CustomNetworkCollectionValues,
  CustomNetworkNestedLinkPayloadSchema,
  type CustomNetworkNestedLinkPayloadValues,
  CustomNetworkNestedLinkStatusPayloadSchema,
  type CustomNetworkNestedLinkValues,
} from "@/domains/linker/validations/custom-network.validation";
import { NestedStatusBadge } from "./columns";

interface ExpandedRowContentProps {
  row: Row<CustomNetworkCollectionValues>;
  table: Table<CustomNetworkCollectionValues>;
}

export const ExpandedRowContent = ({ row, table }: ExpandedRowContentProps) => {
  const { projectId, customNetworkId } = useParams<{ projectId: string; customNetworkId: string }>();
  const globalFilter = (table.getState().globalFilter as string) ?? "";
  const statusFilter = table.getColumn("nestedStatus")?.getFilterValue() as string[];
  const { mutate, isPending } = useUpdateCustomNetworkNestedLink(projectId, customNetworkId);
  const { mutate: deleteMutate, isPending: deleteIsPending } = useRemoveCustomNetworkCollectionNestedLink(
    projectId,
    customNetworkId
  );
  const [loadingId, setLoadingId] = React.useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<CustomNetworkNestedLinkValues | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    const res = CustomNetworkCollectionNestedPayloadSchema.safeParse({
      projectId,
      customNetworkId,
      collectionId: row.id,
      nestedId: deleteTarget.id,
    });

    if (!res.success) return null;

    deleteMutate(res.data, {
      onSettled: () => {
        setDeleteTarget(null);
      },
    });
  };

  const handleStaus = (nestedId: string, status: CustomNetworkNestedLinkValues["status"]) => {
    const res = CustomNetworkNestedLinkStatusPayloadSchema.safeParse({
      projectId,
      customNetworkId,
      collectionId: row.id,
      nestedId,
      status,
    });

    if (!res.success) return null;

    setLoadingId(nestedId);

    mutate(res.data, {
      onSettled: () => {
        setLoadingId(null);
      },
    });
  };

  const handleAddLink = (
    nestedId: string,
    status: CustomNetworkNestedLinkPayloadValues["status"],
    anchor: CustomNetworkNestedLinkPayloadValues["anchor"]
  ) => {
    const res = CustomNetworkNestedLinkPayloadSchema.safeParse({
      projectId,
      customNetworkId,
      collectionId: row.id,
      nestedId,
      status,
      anchor,
    });
    if (!res.success) return null;

    setLoadingId(nestedId);

    mutate(res.data, {
      onSettled: () => {
        setLoadingId(null);
      },
    });
  };

  const filteredChildren = React.useMemo(() => {
    return (row.original.nestedData ?? []).filter((child) => {
      const search = globalFilter.toLowerCase();

      const matchesStatus = !statusFilter?.length || statusFilter.includes(child.status);
      const matchesSearch =
        !search || [child.title, child.url, child.anchor].some((v) => v?.toLowerCase().includes(search));

      return matchesStatus && matchesSearch;
    });
  }, [row.original.nestedData, globalFilter, statusFilter]);

  const renderActions = (child: CustomNetworkNestedLinkValues) => {
    return (
      <div className="flex items-center justify-end gap-1">
        {child.status === "UNLINKED" && (
          <>
            <Button
              variant="link"
              size="sm"
              className="h-7 hover:no-underline text-xs px-2.5 font-semibold text-primary"
              disabled={isPending && loadingId === child.id}
              onClick={() => handleAddLink(child.id, "ACTIVE", "new added anchor")}
            >
              Add Link
            </Button>
            <Button
              variant="link"
              size="sm"
              className="h-7 text-xs px-2.5 text-destructive hover:text-destructive/80 hover:no-underline font-semibold"
              disabled={deleteIsPending && deleteTarget?.id === child.id}
              onClick={() => setDeleteTarget(child)}
            >
              {deleteIsPending && deleteTarget?.id === child.id ? <Spinner /> : "Remove"}
            </Button>
          </>
        )}
        {child.status === "STALE" && (
          <>
            <Button
              variant="default"
              size="sm"
              className="h-7 bg-primary text-primary-foreground hover:bg-primary/90 gap-1 text-xs px-2.5 font-semibold shadow-2xs"
              disabled={isPending && loadingId === child.id}
              onClick={() => handleStaus(child.id, "ACTIVE")}
            >
              {isPending && loadingId === child.id ? <Spinner /> : "Activate"}
            </Button>
            <Button
              variant="link"
              size="sm"
              className="h-7 text-xs px-2.5 text-destructive hover:text-destructive/80 hover:no-underline font-semibold"
              disabled={deleteIsPending && deleteTarget?.id === child.id}
              onClick={() => setDeleteTarget(child)}
            >
              {deleteIsPending && deleteTarget?.id === child.id ? <Spinner /> : "Remove"}
            </Button>
          </>
        )}
        {child.status === "ACTIVE" && (
          <>
            <Button
              variant="secondary"
              size="sm"
              className="h-7 bg-chart-1/10 hover:bg-chart-1/20 text-chart-1 border-none gap-1 text-xs px-2.5 font-semibold shadow-2xs"
              disabled={isPending && loadingId === child.id}
              onClick={() => handleStaus(child.id, "STALE")}
            >
              {isPending && loadingId === child.id ? <Spinner /> : "Stale"}
            </Button>
            <Button
              variant="link"
              size="sm"
              className="h-7 text-xs px-2.5 text-destructive hover:text-destructive/80 hover:no-underline font-semibold"
              disabled={deleteIsPending && deleteTarget?.id === child.id}
              onClick={() => setDeleteTarget(child)}
            >
              {deleteIsPending && deleteTarget?.id === child.id ? <Spinner /> : "Remove"}
            </Button>
          </>
        )}
      </div>
    );
  };

  return (
    <TableRow>
      <TableCell colSpan={row.getVisibleCells().length} className="p-2">
        <div className="bg-card shadow-xl overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
            <div className="text-[10px] font-bold uppercase text-primary flex items-center gap-2">
              <span className="text-xs">🔗</span> Target Links for {row.original.url}
            </div>
            <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-mono shadow-2xs">
              Showing {filteredChildren.length} of {row.original.nestedData?.length ?? 0}
            </span>
          </div>

          <table className="w-full text-left">
            <thead className="bg-muted/10 text-[10px] uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Page Title & URL</th>
                <th className="px-4 py-2.5 font-semibold">Anchor Text</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
                <th className="px-4 py-2.5 text-right font-semibold pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredChildren.length > 0 ? (
                filteredChildren.map((child) => (
                  <tr key={child.id} className="text-sm group/child hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-foreground">{child.title}</div>
                      <div className="text-xs text-primary truncate max-w-50">{child.url}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground italic text-xs">
                      {child.anchor ? `"${child.anchor}"` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <NestedStatusBadge status={child.status} />
                    </td>
                    <td className="px-4 py-3 text-right pr-6">{renderActions(child)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl opacity-50">🔍</span>
                      <p className="text-xs text-muted-foreground font-medium">
                        No links in this row match your current filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ConfirmDelete deleteTarget={deleteTarget} setDeleteTarget={setDeleteTarget} onDelete={handleDeleteConfirm} />
      </TableCell>
    </TableRow>
  );
};

function ConfirmDelete({
  deleteTarget,
  setDeleteTarget,
  onDelete,
}: {
  deleteTarget: CustomNetworkNestedLinkValues | null;
  setDeleteTarget: (arg: null) => void;
  onDelete: () => void;
}) {
  return (
    <AlertDialog
      open={!!deleteTarget}
      onOpenChange={(open) => {
        if (!open) setDeleteTarget(null);
      }}
    >
      <AlertDialogContent className="bg-card shadow-xl rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">Remove Link?</AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            This action will remove the selected nested link.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" className="hover:bg-accent text-foreground shadow-2xs">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={onDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-2xs"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
