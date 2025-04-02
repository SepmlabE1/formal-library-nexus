
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  title: string;
  className?: string;
}

const Header = ({ title, className }: HeaderProps) => {
  return (
    <header className={`bg-white shadow-sm py-4 ${className}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-library-navy">{title}</h1>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search..." 
              className="pl-10 w-64 focus:border-library-blue"
            />
          </div>
          
          <Button size="icon" variant="ghost" className="relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-library-blue grid place-items-center text-white font-bold">
              A
            </div>
            <span className="hidden md:inline text-sm font-medium">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
