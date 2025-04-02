
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: number;
  description?: string;
  icon?: ReactNode;
  isLoading?: boolean;
}

const StatCard = ({ title, value, description, icon, isLoading = false }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            {isLoading ? (
              <Skeleton className="h-4 w-24 mb-2" />
            ) : (
              <p className="text-sm text-muted-foreground">{title}</p>
            )}
            
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <h3 className="text-2xl font-bold">{value.toLocaleString()}</h3>
            )}
            
            {description && (
              isLoading ? (
                <Skeleton className="h-3 w-32 mt-2" />
              ) : (
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
              )
            )}
          </div>
          
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {isLoading ? (
              <Skeleton className="h-6 w-6 rounded-full" />
            ) : (
              icon
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
