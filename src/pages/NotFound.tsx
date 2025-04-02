
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-serif font-bold mb-4 text-library-navy">404</h1>
        <p className="text-xl text-library-gray mb-6">The page you are looking for cannot be found.</p>
        <Button 
          onClick={() => navigate("/")}
          className="bg-library-blue hover:bg-library-blue/90"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
