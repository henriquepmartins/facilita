import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>

      {/* Overview Section */}
      <div>
        <Skeleton className="h-6 w-24 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-4 space-y-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-28" />
            </Card>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Income Categories */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>

        {/* Expense Categories */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* History Section */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-24" />
        <div className="flex gap-4 mb-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="h-[300px] relative">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 flex gap-2"
              style={{ left: `${i * 8}%` }}
            >
              <Skeleton className={`w-4 h-${20 + Math.random() * 40}}`} />
              <Skeleton className={`w-4 h-${20 + Math.random() * 40}}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
