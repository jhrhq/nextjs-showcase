"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DeleteProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  onDelete: () => void;
  isPending: boolean;
  error: Error | null;
}

export function DeleteProjectDialog({
  isOpen,
  onClose,
  projectName,
  onDelete,
  isPending,
  error,
}: DeleteProjectDialogProps) {
  const [confirmationInput, setConfirmationInput] = useState("");
  const isConfirmed = confirmationInput.toUpperCase() === "DELETE";

  const handleConfirmDelete = () => {
    if (!isConfirmed) return;
    onDelete();
  };

  const handleCancel = () => {
    setConfirmationInput("");
    onClose();
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isPending) handleCancel();
      }}
    >
      <AlertDialogContent className="sm:max-w-106.25">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-destructive">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground mt-2">
            This will permanently delete the project{" "}
            <span className="font-semibold text-foreground">"{projectName}"</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 space-y-2">
          <Label htmlFor="confirm-text" className="text-sm font-medium">
            To confirm, type <span className="font-bold select-all">DELETE</span> below:
          </Label>
          <Input
            id="confirm-text"
            type="text"
            placeholder="DELETE"
            value={confirmationInput}
            onChange={(e) => setConfirmationInput(e.target.value)}
            disabled={isPending}
            className="border-destructive/30 focus-visible:ring-destructive"
          />
        </div>

        {error && (
          <div className="text-sm p-3 rounded bg-destructive/10 text-destructive font-medium border border-destructive/20">
            {error.message || "Failed to delete project"}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={handleCancel}>
            Cancel
          </AlertDialogCancel>

          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={!isConfirmed || isPending}
            className="gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Project"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
