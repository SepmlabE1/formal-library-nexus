
import Layout from "@/components/layout/Layout";
import { BarChart4, Download, FileText, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Reports = () => {
  // Mock data for demonstration
  const circulationData = [
    { month: 'Jan', checkouts: 65, returns: 42 },
    { month: 'Feb', checkouts: 59, returns: 51 },
    { month: 'Mar', checkouts: 80, returns: 72 },
    { month: 'Apr', checkouts: 81, returns: 73 },
    { month: 'May', checkouts: 56, returns: 44 },
    { month: 'Jun', checkouts: 55, returns: 40 },
  ];

  const reportCards = [
    {
      title: "Monthly Circulation Report",
      description: "Book checkouts and returns by month",
      icon: <BarChart4 className="h-5 w-5" />,
      lastGenerated: "June 30, 2023"
    },
    {
      title: "Overdue Books Report",
      description: "Books currently overdue with member information",
      icon: <FileText className="h-5 w-5" />,
      lastGenerated: "June 29, 2023"
    },
    {
      title: "Popular Books Report",
      description: "Most frequently checked out books",
      icon: <FileText className="h-5 w-5" />,
      lastGenerated: "June 25, 2023"
    },
    {
      title: "Member Activity Report",
      description: "Member loan activity and statistics",
      icon: <FileText className="h-5 w-5" />,
      lastGenerated: "June 20, 2023"
    }
  ];

  return (
    <Layout title="Reports">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Library Reports</h2>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Generate Report</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Circulation Report
                  </NavigationMenuLink>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Membership Report
                  </NavigationMenuLink>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Book Catalog Report
                  </NavigationMenuLink>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Overdue Items Report
                  </NavigationMenuLink>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Custom Report
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Monthly Circulation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={circulationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="checkouts" fill="#4F46E5" name="Checkouts" />
              <Bar dataKey="returns" fill="#10B981" name="Returns" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Book Categories</h3>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span>Fiction</span>
              <div className="w-64 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="text-sm font-medium">70%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Non-Fiction</span>
              <div className="w-64 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Science Fiction</span>
              <div className="w-64 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <span className="text-sm font-medium">30%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Classic</span>
              <div className="w-64 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <span className="text-sm font-medium">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Biography</span>
              <div className="w-64 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <span className="text-sm font-medium">15%</span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-4">Available Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-xs text-muted-foreground">Last generated: {card.lastGenerated}</div>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Download</span>
                <Download className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Reports;
