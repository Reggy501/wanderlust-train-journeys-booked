
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { TrainFront, Ticket, Calendar, User } from "lucide-react";
import { format, parseISO } from "date-fns";

interface TicketType {
  id: string;
  departureCity: string;
  arrivalCity: string;
  date: string;
  ticketClass: string;
  passengers: number;
  price: number;
}

const TicketsPage = () => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load tickets from local storage
    if (user) {
      const storedTickets = localStorage.getItem(`trainEasyTickets_${user.id}`);
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets));
      }
    }
  }, [isAuthenticated, navigate, user]);

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMMM d, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-2">My Tickets</h1>
        <p className="text-center text-gray-600 mb-8">
          View and manage all your booked tickets
        </p>

        {tickets.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex justify-center mb-4">
                <Ticket className="h-16 w-16 text-gray-300" />
              </div>
              <h3 className="text-xl font-medium mb-2">No tickets found</h3>
              <p className="text-gray-600 mb-6">
                You haven't booked any tickets yet. Start your journey today!
              </p>
              <Button
                onClick={() => navigate('/booking')}
                className="bg-train-primary hover:bg-train-secondary"
              >
                Book Your First Ticket
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="overflow-hidden">
                <div className="flex h-2">
                  <div className="w-1/2 bg-train-primary"></div>
                  <div className="w-1/2 bg-train-accent"></div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        {ticket.departureCity} to {ticket.arrivalCity}
                      </CardTitle>
                      <CardDescription>
                        Ticket #{ticket.id.slice(0, 6).toUpperCase()}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-train-primary font-semibold">
                        ${ticket.price.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {ticket.ticketClass === "economy" ? "Economy Class" : "Business Class"}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-train-primary" />
                      <div>
                        <div className="text-sm text-gray-500">Date</div>
                        <div className="font-medium">{formatDate(ticket.date)}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-train-primary" />
                      <div>
                        <div className="text-sm text-gray-500">Passengers</div>
                        <div className="font-medium">{ticket.passengers}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <TrainFront className="h-5 w-5 text-train-primary" />
                      <div>
                        <div className="text-sm text-gray-500">Service</div>
                        <div className="font-medium">Express</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline">Download Ticket</Button>
                  <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    Cancel Booking
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate('/booking')}
            className="bg-train-primary hover:bg-train-secondary"
          >
            Book Another Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
