
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  RotateCcw, 
  Home, 
  Settings, 
  BarChart4, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const NavItem = ({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-primary/50"
        }`
      }
      onClick={() => isMobile && setIsOpen(false)}
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );

  return (
    <>
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="fixed top-4 left-4 z-50 bg-library-navy text-white"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      )}
      
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-64 bg-library-navy transform transition-transform duration-200 ease-in-out ${className} flex flex-col`}
      >
        <div className="px-6 py-8">
          <h1 className="text-xl font-bold text-white">Library System</h1>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavItem to="/" icon={<Home size={20} />}>
            Dashboard
          </NavItem>
          <NavItem to="/catalog" icon={<BookOpen size={20} />}>
            Book Catalog
          </NavItem>
          <NavItem to="/members" icon={<Users size={20} />}>
            Members
          </NavItem>
          <NavItem to="/circulation" icon={<RotateCcw size={20} />}>
            Circulation
          </NavItem>
          <NavItem to="/reports" icon={<BarChart4 size={20} />}>
            Reports
          </NavItem>
          <NavItem to="/settings" icon={<Settings size={20} />}>
            Settings
          </NavItem>
        </nav>

        <div className="px-3 py-4 border-t border-sidebar-border/30">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-primary/50"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </div>
      
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
