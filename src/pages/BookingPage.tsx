
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

// Mock data
const cities = [
  "New York", "Chicago", "Los Angeles", "Boston", "Philadelphia", 
  "Washington DC", "Seattle", "San Francisco", "Miami", "Denver"
];

const BookingPage = () => {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [date, setDate] = useState<Date>();
  const [ticketClass, setTicketClass] = useState("economy");
  const [passengers, setPassengers] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to book tickets",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, toast]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Check authentication first
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to book tickets",
        variant: "destructive",
      });
      navigate('/login');
      setIsSubmitting(false);
      return;
    }
    
    // Validation
    if (!departureCity || !arrivalCity || !date) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    if (departureCity === arrivalCity) {
      toast({
        title: "Error",
        description: "Departure and arrival cities cannot be the same",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Create a ticket object
    const ticket = {
      id: Math.random().toString(36).substr(2, 9),
      departureCity,
      arrivalCity,
      date: date ? format(date, "yyyy-MM-dd") : "",
      ticketClass,
      passengers,
      price: ticketClass === "economy" ? 49.99 * passengers : 99.99 * passengers,
    };
    
    // Save ticket to local storage
    if (user) {
      const storedTickets = localStorage.getItem(`trainEasyTickets_${user.id}`);
      const tickets = storedTickets ? JSON.parse(storedTickets) : [];
      tickets.push(ticket);
      localStorage.setItem(`trainEasyTickets_${user.id}`, JSON.stringify(tickets));
      
      toast({
        title: "Success!",
        description: "Your ticket has been booked successfully",
      });
      
      // Redirect to tickets page
      navigate('/tickets');
    }
    
    setIsSubmitting(false);
  };
  
  if (!isAuthenticated) {
    return (
      <div className="py-12 px-4 bg-slate-50 min-h-[calc(100vh-200px)]">
        <div className="container mx-auto max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Authentication Required</CardTitle>
              <CardDescription>
                You need to be logged in to book tickets
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
              <LogIn className="h-16 w-16 text-train-primary mb-4" />
              <p className="text-center text-gray-600">
                Please log in or create an account to access our booking system
              </p>
            </CardContent>
            <CardFooter className="flex justify-center space-x-4">
              <Button
                onClick={() => navigate('/login')}
                className="bg-train-primary hover:bg-train-secondary"
              >
                Log In
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Book Your Train Ticket</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Journey Details</CardTitle>
            <CardDescription>
              Fill in the information below to find available trains
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="departureCity">Departure City</Label>
                  <Select value={departureCity} onValueChange={setDepartureCity}>
                    <SelectTrigger id="departureCity">
                      <SelectValue placeholder="Select departure city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="arrivalCity">Arrival City</Label>
                  <Select value={arrivalCity} onValueChange={setArrivalCity}>
                    <SelectTrigger id="arrivalCity">
                      <SelectValue placeholder="Select arrival city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Select 
                    value={passengers.toString()} 
                    onValueChange={(value) => setPassengers(parseInt(value))}
                  >
                    <SelectTrigger id="passengers">
                      <SelectValue placeholder="Select number of passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Ticket Class</Label>
                <RadioGroup 
                  value={ticketClass} 
                  onValueChange={setTicketClass}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="economy" id="economy" />
                    <Label htmlFor="economy" className="font-normal cursor-pointer">
                      Economy ($49.99 per person)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business" className="font-normal cursor-pointer">
                      Business ($99.99 per person)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-train-primary hover:bg-train-secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Book Ticket"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Important Information</h2>
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <div className="space-y-1">
              <h3 className="font-medium">Ticket Policies</h3>
              <p className="text-sm text-gray-600">
                Tickets can be changed or refunded up to 24 hours before departure. A fee may apply.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Baggage Allowance</h3>
              <p className="text-sm text-gray-600">
                Each passenger is allowed 2 pieces of luggage, not exceeding 23kg (50lbs) each.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Check-in Information</h3>
              <p className="text-sm text-gray-600">
                Please arrive at the station at least 30 minutes before your scheduled departure time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
