
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  className?: string;
}

const StatCard = ({ title, value, description, icon, className }: StatCardProps) => {
  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-library-blue">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-library-navy">{value}</div>
        {description && (
          <CardDescription className="mt-1">{description}</CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
