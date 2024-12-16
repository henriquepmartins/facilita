"use client";

import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { PlusSquareIcon, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import CreateCategoryDialog from "../_components/CreateCategoryDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function page() {
  return (
    <>
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xl font-semibold">Gerenciamento</p>
            <p className="text-muted-foreground text-sm">
              Gerencie os dados da sua conta e ajuste suas categorias.
            </p>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="container flex flex-col gap-4 p-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Moeda</CardTitle>
            <CardDescription>
              Selecione qual a moeda que deseja usar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyComboBox />
          </CardContent>
        </Card>
        <CategoryList type="income" />
        <CategoryList type="expense" />
      </div>
    </>
  );
}

export default page;

function CategoryList({ type }: { type: TransactionType }) {
  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  return (
    <SkeletonWrapper isLoading={categoriesQuery.isFetching}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              {type === "expense" ? (
                <TrendingDown className="h-12 w-12 items-center rounded-lg bg-red-400/10 p-2 text-red-500" />
              ) : (
                <TrendingUp className="h-12 w-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500" />
              )}
              <div>
                Categoria {type === "income" ? "Proventos" : "Despesas"}
                <div className="text-sm text-muted-foreground">
                  Filtrado por nome
                </div>
              </div>
            </div>

            <CreateCategoryDialog
              type={type}
              successCallback={() => categoriesQuery.refetch()}
              trigger={
                <Button className="gap-2 text-sm">
                  <PlusSquareIcon className="h-4 w-4" />
                  Criar Categoria
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
      </Card>
    </SkeletonWrapper>
  );
}
