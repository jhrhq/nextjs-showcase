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
import { useRemoveCustomNetworkStructure, useUpdateCustomNetworkStructure } from "@/domains/linker/hooks/use-projects";
import {
  type CustomNetworkCollectionValues,
  type CustomNetworkNestedLinkValues,
  DeleteCustomNetworkNestedSchema,
  type UpdateCustomNetworkAddLink,
  UpdateCustomNetworkAddLinkSchema,
  UpdateCustomNetworkStatusSchema,
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
  const { mutate, isPending } = useUpdateCustomNetworkStructure(projectId, customNetworkId);
  const { mutate: deleteMutate, isPending: deleteIsPending } = useRemoveCustomNetworkStructure(
    projectId,
    customNetworkId
  );
  const [loadingId, setLoadingId] = React.useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<CustomNetworkNestedLinkValues | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    const res = DeleteCustomNetworkNestedSchema.safeParse({
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
    const res = UpdateCustomNetworkStatusSchema.safeParse({
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
    status: UpdateCustomNetworkAddLink["status"],
    anchor: UpdateCustomNetworkAddLink["anchor"]
  ) => {
    const res = UpdateCustomNetworkAddLinkSchema.safeParse({
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

  // 1. Synchronized Filtering Logic
  const filteredChildren = React.useMemo(() => {
    return (row.original.nestedData ?? []).filter((child) => {
      const search = globalFilter.toLowerCase();

      const matchesStatus = !statusFilter?.length || statusFilter.includes(child.status);
      const matchesSearch =
        !search || [child.title, child.url, child.anchor].some((v) => v?.toLowerCase().includes(search));

      return matchesStatus && matchesSearch;
    });
  }, [row.original.nestedData, globalFilter, statusFilter]);

  // 2. Action Buttons Helper
  const renderActions = (child: CustomNetworkNestedLinkValues) => {
    return (
      <div className="flex items-center justify-end gap-1">
        {child.status === "UNLINKED" && (
          <>
            <Button
              variant="link"
              size="sm"
              className="h-7 hover:no-underline text-xs px-2.5 font-semibold text-blue-600"
              disabled={isPending && loadingId === child.id}
              onClick={() => handleAddLink(child.id, "ACTIVE", "new added anchor")}
            >
              Add Link
            </Button>
            <Button
              variant="link"
              size="sm"
              className="h-7 text-xs px-2.5 text-rose-400 hover:text-destructive hover:no-underline font-semibold"
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
              variant="secondary"
              size="sm"
              className="h-7 bg-transparent hover:bg-transparent  border-none gap-1 text-xs px-2.5 font-semibold"
              disabled={isPending && loadingId === child.id}
              onClick={() => handleStaus(child.id, "ACTIVE")}
            >
              {isPending && loadingId === child.id ? <Spinner /> : "Activate"}
            </Button>
            <Button
              variant="link"
              size="sm"
              className="h-7 text-xs px-2.5 text-rose-400 hover:text-destructive hover:no-underline font-semibold"
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
              className="h-7 bg-transparent hover:bg-transparent border-none gap-1 text-xs text-violet-500 px-2.5 font-semibold"
              disabled={isPending && loadingId === child.id}
              onClick={() => handleStaus(child.id, "STALE")}
            >
              {isPending && loadingId === child.id ? <Spinner /> : "Stale"}
            </Button>
            <Button
              variant="link"
              size="sm"
              className="h-7 text-xs px-2.5 text-rose-400 hover:text-destructive hover:no-underline font-semibold"
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
    <TableRow className="bg-slate-50/30 border-none hover:bg-slate-50/30">
      <TableCell colSpan={row.getVisibleCells().length} className="p-4">
        <div className="border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Sub-Header */}
          <div className="flex items-center justify-between border-b bg-slate-50/50 px-4 py-2">
            <div className="text-[10px] font-bold uppercase text-blue-600 flex items-center gap-2">
              <span className="text-xs">🔗</span> Target Links for {row.original.url}
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100 font-mono">
              Showing {filteredChildren.length} of {row.original.nestedData?.length ?? 0}
            </span>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] uppercase text-slate-400 border-b">
              <tr>
                <th className="px-4 py-2 font-semibold">Page Title & URL</th>
                <th className="px-4 py-2 font-semibold">Anchor Text</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 text-right font-semibold pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredChildren.length > 0 ? (
                filteredChildren.map((child) => (
                  <tr key={child.id} className="text-sm group/child hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-800">{child.title}</div>
                      <div className="text-xs text-blue-500 truncate max-w-50">{child.url}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 italic text-xs">
                      {child.anchor ? `"${child.anchor}"` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <NestedStatusBadge status={child.status} />
                    </td>
                    <td className="px-4 py-3 text-right pr-6">{renderActions(child)}</td>
                    <ConfirmDelete
                      deleteTarget={deleteTarget}
                      setDeleteTarget={setDeleteTarget}
                      onDelete={handleDeleteConfirm}
                    />
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl opacity-50">🔍</span>
                      <p className="text-xs text-slate-400 font-medium">
                        No links in this row match your current filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Link?</AlertDialogTitle>

          <AlertDialogDescription>This action will remove the selected nested link.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
