import React, { useCallback, useMemo } from "react";
import CountUp from "react-countup";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/route";
import { DateToUTCDate, GetFormaterForCurrency } from "@/lib/helpers";

interface UserSettings {
  currency: string;
}

interface Props {
  from: Date;
  to: Date;
  userSettings: UserSettings;
}

interface StatCardProps {
  formatter: Intl.NumberFormat;
  value: number;
  icon: React.ReactNode;
  title: string;
}

function StatCard({ formatter, value, icon, title }: StatCardProps) {
  const formatFn = useCallback(
    (value: number) => formatter.format(value),
    [formatter]
  );

  return (
    <Card className="flex h-24 w-full items-center gap-2 p-4">
      {icon}
      <div className="flex flex-col items-start gap-0">
        <p className="text-muted-foreground">{title}</p>
        <CountUp
          preserveValue
          redraw={false}
          end={value}
          decimals={2}
          formattingFn={formatFn}
          className="text-base sm:text-lg md:text-xl font-medium"
        />
      </div>
    </Card>
  );
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
      <Card className="h-24 w-full animate-pulse bg-gray-100">
        <div className="opacity-0">{children}</div>
      </Card>
    );
  }
  return children;
}

function StatsCards({ from, to, userSettings }: Props) {
  const statsQuery = useQuery<GetBalanceStatsResponseType>({
    queryKey: ["overview", "stats", from, to],
    queryFn: async () => {
      const response = await fetch(
        `/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
      );
      return response.json();
    },
  });

  const formatter = useMemo(
    () => GetFormaterForCurrency(userSettings.currency),
    [userSettings.currency]
  );

  const income = statsQuery.data?.income ?? 0;
  const expense = statsQuery.data?.expense ?? 0;
  const balance = income - expense;

  if (statsQuery.error) {
    return <div className="text-red-500">Error loading stats</div>;
  }

  return (
    <div className="relative flex w-full mb-3 flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isLoading}>
        <StatCard
          formatter={formatter}
          value={income}
          title="Receita"
          icon={
            <TrendingUp className="h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isLoading}>
        <StatCard
          formatter={formatter}
          value={expense}
          title="Despesas"
          icon={
            <TrendingDown className="h-12 w-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10" />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isLoading}>
        <StatCard
          formatter={formatter}
          value={balance}
          title="Saldo"
          icon={
            <Wallet className="h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10" />
          }
        />
      </SkeletonWrapper>
    </div>
  );
}

export default StatsCards;
