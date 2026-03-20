import * as React from "react";
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
import { Spinner } from "@/components/ui/spinner";
import { Post } from "@/lib/helpers/post-types";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  open: boolean;
  target: Post | null;
  busy: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: () => void;
}

export function DeletePostAlertDialog({
  open,
  target,
  busy,
  onOpenChange,
  onConfirm,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">Supprimer ce post ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible.
            {target ? ` "${target.title}" sera définitivement supprimé.` : ""}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            disabled={busy}
            onClick={onConfirm}
            className={"bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"}
          >
            {busy ? (
              <>
                <Spinner className="mr-2" /> Suppression…
              </>
            ) : (
              "Supprimer"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
