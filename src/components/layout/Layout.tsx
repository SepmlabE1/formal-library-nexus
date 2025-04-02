
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <main className={`flex-1 ${isMobile ? "" : "ml-64"}`}>
        <Header title={title} />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
