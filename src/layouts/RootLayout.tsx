
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { TrainFront, Ticket, User } from "lucide-react";

const RootLayout = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <TrainFront className="h-6 w-6 text-train-primary" />
            <span className="font-bold text-xl text-train-dark">TrainEasy</span>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-train-primary ${
                location.pathname === '/' ? 'text-train-primary' : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/booking" 
              className={`text-sm font-medium transition-colors hover:text-train-primary ${
                location.pathname === '/booking' ? 'text-train-primary' : 'text-gray-600'
              }`}
            >
              Book Tickets
            </Link>
            {isAuthenticated && (
              <Link 
                to="/tickets" 
                className={`text-sm font-medium transition-colors hover:text-train-primary ${
                  location.pathname === '/tickets' ? 'text-train-primary' : 'text-gray-600'
                }`}
              >
                My Tickets
              </Link>
            )}
          </nav>
          
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-700 hidden md:block">
                  <span>Welcome, </span>
                  <span className="font-medium">{user?.name}</span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => logout()}
                  className="text-gray-700 hover:text-train-primary hover:bg-train-light"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-train-primary hover:bg-train-light"
                >
                  Login
                </Button>
                <Button 
                  variant="default"
                  size="sm" 
                  onClick={() => navigate('/register')}
                  className="bg-train-primary hover:bg-train-secondary"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-train-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <TrainFront className="h-6 w-6 text-train-accent" />
                <span className="font-bold text-xl">TrainEasy</span>
              </div>
              <p className="text-sm text-gray-300 max-w-xs">
                Book your train tickets quickly and easily. Travel comfortably with TrainEasy.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 sm:gap-16">
              <div>
                <h3 className="text-sm font-semibold mb-4 uppercase text-train-accent">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-4 uppercase text-train-accent">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Safety Center</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Community</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} TrainEasy. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex items-center space-x-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
