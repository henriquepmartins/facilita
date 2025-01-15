"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { DeleteTransaction } from "../_actions/deleteTransaction";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  transactionId: string;
}

function DeleteTransactionDialog({ open, setOpen, transactionId }: Props) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => DeleteTransaction(transactionId),
    onSuccess: async () => {
      toast.success("Transação deletada com sucesso", {
        id: transactionId,
      });

      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["overview", "transactions", "history"],
      });

      setOpen(false);
    },
    onError: () => {
      toast.error("Algo deu errado ao deletar uma transação");
      setOpen(false);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem certeza que deseja deletar essa transação?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deletando..." : "Deletar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default DeleteTransactionDialog;
