import { Bike, Calendar, MapPin, Star, ChevronRight, Instagram, Facebook, Twitter } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const handleBookNow = () => {
    toast("Booking initiated!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 z-0"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="text-primary">Explore</span> the city on two wheels
              </h1>
              <p className="text-muted-foreground text-lg max-w-md">
                Rent premium bikes for your adventure. Affordable rates, flexible plans, and top-quality service.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={handleBookNow}>
                  Book Now <ChevronRight className="ml-1" />
                </Button>
                <Button size="lg" variant="outline">
                  View Fleet
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Premium bike" 
                className="rounded-lg shadow-xl w-full max-w-lg mx-auto object-cover h-[400px]" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Bikes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card border-none shadow-md">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <Bike className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Fleet</h3>
                <p className="text-muted-foreground">Our bikes are regularly maintained and include the latest models for optimal performance.</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-none shadow-md">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <MapPin className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Convenient Locations</h3>
                <p className="text-muted-foreground">Multiple pickup points across the city for your convenience.</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-none shadow-md">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <Calendar className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Rentals</h3>
                <p className="text-muted-foreground">Hourly, daily, or weekly rentals to suit your schedule and needs.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Bikes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Popular Bikes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["City Cruiser", "Mountain Explorer", "Road Master"].map((bike, index) => (
              <Card key={index} className="overflow-hidden group">
                <div className="relative h-48 bg-muted">
                  <img 
                    src={`https://source.unsplash.com/random/300x200?bike,bicycle&sig=${index}`} 
                    alt={bike} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                  />
                  <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg">{bike}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="ml-1 text-sm">4.{8 - index}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">Perfect for {index === 0 ? "city rides" : index === 1 ? "off-road adventures" : "speed enthusiasts"}.</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">${15 + index * 5}/hour</span>
                    <Button variant="outline" size="sm" onClick={() => toast(`${bike} selected!`)}>
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="secondary" size="lg">
              View All Bikes
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who have explored the city with our premium bikes.
          </p>
          <Button size="lg" onClick={handleBookNow} className="px-8">
            Book Your Ride Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Bike Rentals</h3>
              <p className="text-muted-foreground">Premium bike rental services for all your adventures.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "About Us", "Bikes", "Pricing", "Contact"].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <address className="text-muted-foreground not-italic">
                <p>123 Bike Street</p>
                <p>Cycle City, BC 10000</p>
                <p className="mt-2">info@bikerentals.com</p>
                <p>+1 (555) 123-4567</p>
              </address>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Bike Rentals. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
