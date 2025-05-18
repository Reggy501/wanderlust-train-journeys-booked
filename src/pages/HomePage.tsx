
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TrainFront, Calendar, Clock, List } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const destinations = [
    { name: "New York", image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1000&auto=format&fit=crop" },
    { name: "Chicago", image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?q=80&w=1000&auto=format&fit=crop" },
    { name: "San Francisco", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000&auto=format&fit=crop" },
    { name: "Seattle", image: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?q=80&w=1000&auto=format&fit=crop" },
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-train-dark text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-train-dark via-train-dark/90 to-train-dark/70"></div>
          <img 
            src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1784&auto=format&fit=crop"
            alt="Train station"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto relative z-10 px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Travel Made Simple with TrainEasy
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Book your train tickets in minutes. Easy booking, comfortable travel, unforgettable journeys.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/booking')}
                className="bg-train-primary hover:bg-train-secondary text-white"
              >
                Book Now
              </Button>
              {!isAuthenticated && (
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/register')}
                  className="border-white text-white hover:bg-white/20"
                >
                  Create Account
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-white h-16 rounded-t-[50px]"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TrainEasy</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-train-light rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-train-primary text-white mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Booking</h3>
              <p className="text-gray-600">Book your tickets in less than 2 minutes with our streamlined process.</p>
            </div>
            
            <div className="bg-train-light rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-train-primary text-white mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">Choose from multiple departure times to fit your travel plans.</p>
            </div>
            
            <div className="bg-train-light rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-train-primary text-white mb-4">
                <List className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Management</h3>
              <p className="text-gray-600">View and manage all your tickets in one place, anytime.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Destinations */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Popular Destinations</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore some of our most popular routes and plan your next journey with TrainEasy.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg shadow-md">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-64 object-cover transition-transform group-hover:scale-110 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-white text-xl font-semibold">{destination.name}</h3>
                    <Button 
                      variant="link" 
                      className="text-train-accent p-0 h-auto"
                      onClick={() => navigate('/booking')}
                    >
                      Find tickets →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-train-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join thousands of satisfied travelers who book with TrainEasy every day.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/booking')}
            className="bg-white text-train-primary hover:bg-train-light"
          >
            Book Your Train Now
          </Button>
        </div>
      </section>

      {/* Train Animation */}
      <div className="relative overflow-hidden bg-train-light h-12">
        <div className="absolute animate-train-move">
          <TrainFront className="h-8 w-8 text-train-primary" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
