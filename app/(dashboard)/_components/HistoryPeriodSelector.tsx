import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Period, Timeframe } from "@/lib/types";
import React from "react";
import { GetHistoryPeriodsResponseType } from "@/app/api/history-periods/route";

interface Props {
  period: Period;
  setPeriod: (period: Period) => void;
  timeframe: Timeframe;
  setTimeframe: (timeframe: Timeframe) => void;
}

function HistoryPeriodSelector({
  period,
  setPeriod,
  timeframe,
  setTimeframe,
}: Props) {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["overview", "history", "periods"],
      queryFn: () => fetch("/api/history-periods").then((res) => res.json()),
    });
  }, []);

  const { data: years = [], isLoading } =
    useQuery<GetHistoryPeriodsResponseType>({
      queryKey: ["overview", "history", "periods"],
      queryFn: () => fetch("/api/history-periods").then((res) => res.json()),
    });

  return (
    <div className="flex flex-wrap items-center gap-4">
      {isLoading ? (
        <Skeleton className="h-10 w-[200px]" />
      ) : (
        <Tabs
          value={timeframe}
          onValueChange={(value) => setTimeframe(value as Timeframe)}
        >
          <TabsList>
            <TabsTrigger value="year">Ano</TabsTrigger>
            <TabsTrigger value="month">Mês</TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      <div className="flex flex-wrap gap-2 items-center">
        {isLoading ? (
          <Skeleton className="h-10 w-[180px]" />
        ) : (
          <YearSelector period={period} setPeriod={setPeriod} years={years} />
        )}
        {timeframe === "month" &&
          (isLoading ? (
            <Skeleton className="h-10 w-[180px]" />
          ) : (
            <MonthSelector period={period} setPeriod={setPeriod} />
          ))}
      </div>
    </div>
  );
}

function YearSelector({
  period,
  setPeriod,
  years,
}: {
  period: Period;
  setPeriod: (period: Period) => void;
  years: GetHistoryPeriodsResponseType;
}) {
  return (
    <Select
      value={period.year.toString()}
      onValueChange={(value) =>
        setPeriod({
          month: period.month,
          year: parseInt(value),
        })
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
function MonthSelector({
  period,
  setPeriod,
}: {
  period: Period;
  setPeriod: (period: Period) => void;
}) {
  return (
    <Select
      value={period.month.toString()}
      onValueChange={(value) =>
        setPeriod({
          year: period.year,
          month: parseInt(value),
        })
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
          const monthString = new Date(period.year, month, 1)
            .toLocaleString("pt-BR", {
              month: "long",
            })
            .replace(/^\w/, (c) => c.toUpperCase());

          return (
            <SelectItem key={month} value={month.toString()}>
              {monthString}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default HistoryPeriodSelector;
