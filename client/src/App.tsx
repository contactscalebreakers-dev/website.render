import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Workshops from "./pages/Workshops";
import Products from "./pages/Products";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import AdminProducts from "./pages/AdminProducts";
import Services from "./pages/Services";
import Services3DScanning from "./pages/Services3DScanning";
import ServicesMurals from "./pages/ServicesMurals";
import Services3DModelling from "./pages/Services3DModelling";
import AdminBookings from "./pages/AdminBookings";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/workshops"} component={Workshops} />
          <Route path={"/products"} component={Products} />
          <Route path={"/portfolio"} component={Portfolio} />
          <Route path={"/about"} component={Portfolio} />
          <Route path={"/contact"} component={Contact} />
          <Route path={"/admin/products"} component={AdminProducts} />
          <Route path={"/services"} component={Services} />
          <Route path={"/services/3d-scanning"} component={Services3DScanning} />
          <Route path={"/services/murals"} component={ServicesMurals} />
          <Route path={"/services/3d-modelling"} component={Services3DModelling} />
          <Route path={"/admin/bookings"} component={AdminBookings} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
