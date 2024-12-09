"use client";

import { GetCategoriesStatsResponseType } from "@/app/api/stats/categories/route";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateToUTCDate, GetFormaterForCurrency } from "@/lib/helpers";
import { TransactionType } from "@/lib/types";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";

interface Props {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}

function SkeletonWrapper({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <Card className="h-80 w-full animate-pulse bg-gray-100">
        <div className="opacity-0">{children}</div>
      </Card>
    );
  }
  return children;
}

function CategoriesStats({ userSettings, from, to }: Props) {
  const statsQuery = useQuery<GetCategoriesStatsResponseType>({
    queryKey: ["overview", "stats", "categories", from, to],
    queryFn: async () => {
      const response = await fetch(
        `/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(
          to
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories stats");
      }
      return response.json();
    },
    staleTime: 30000, // 30 seconds
    retry: 2,
  });

  const formatter = useMemo(
    () => GetFormaterForCurrency(userSettings.currency),
    [userSettings.currency]
  );

  if (statsQuery.error) {
    return <div className="text-red-500">Error loading categories stats</div>;
  }

  return (
    <div className="flex w-full gap-2 flex-wrap md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isLoading}>
        <CategoriesCard
          formatter={formatter}
          type="income"
          data={statsQuery.data ?? []}
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={statsQuery.isLoading}>
        <CategoriesCard
          formatter={formatter}
          type="expense"
          data={statsQuery.data ?? []}
        />
      </SkeletonWrapper>
    </div>
  );
}

interface CategoriesCardProps {
  type: TransactionType;
  formatter: Intl.NumberFormat;
  data: GetCategoriesStatsResponseType;
}

function CategoriesCard({ data, type, formatter }: CategoriesCardProps) {
  const filteredData = data.filter((el) => el.type === type);
  const total = filteredData.reduce(
    (acc, el) => acc + (el._sum?.amount ?? 0),
    0
  );

  return (
    <Card className="h-80 w-full col-span-6">
      <CardHeader>
        <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
          {type === "income" ? "Receitas" : "Despesas"} por categoria
        </CardTitle>
      </CardHeader>
      <div className="flex items-center justify-between gap-2">
        {filteredData.length === 0 ? (
          <div className="flex h-60 w-full flex-col justify-normal items-center">
            Não existem dados para o período selecionado.
            <p className="text-sm text-muted-foreground">
              Tente escolher um período diferente ou tente adicionar novos{" "}
              {type === "income" ? "proventos" : "despesas"}.
            </p>
          </div>
        ) : (
          <ScrollArea className="h-60 w-full px-4">
            <div className="flex w-full flex-col gap-4 p-4">
              {filteredData.map((item) => {
                const amount = item._sum.amount ?? 0;
                const percentage = (amount / (total ?? amount)) * 100;

                return (
                  <div key={item.category} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-400">
                        {item.categoryIcon}
                        {item.category}
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({percentage.toFixed(0)}%)
                        </span>
                      </span>
                      <span className="text-sm text-gray-400">
                        {formatter.format(amount)}
                      </span>
                    </div>
                    <Progress
                      value={percentage}
                      indicator={
                        type === "income" ? "bg-emerald-500" : "bg-red-500"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  );
}

export default CategoriesStats;