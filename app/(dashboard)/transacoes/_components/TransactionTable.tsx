"use client";

import { DateToUTCDate } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { GetTransactionsHistoryResponseType } from "@/app/api/transactions-history/route";

interface Props {
  from: Date;
  to: Date;
}

type TransactionHistoryRow = GetTransactionsHistoryResponseType[0];

export const columns: ColumnDef<TransactionHistoryRow>[] = [];

function TransactionTable({ from, to }: Props) {
  const history = useQuery({
    queryKey: ["transactions", "history", from, to],
    queryFn: () =>
      fetch(
        `/api/transactions-history?from=${DateToUTCDate(
          from
        )}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json()),
  });
  return <div>TransactionTable</div>;
}

export default TransactionTable;
