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
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminProducts from "./pages/AdminProducts";
import Services from "./pages/Services";
import Services3DScanning from "./pages/Services3DScanning";
import ServicesMurals from "./pages/ServicesMurals";
import Services3DModelling from "./pages/Services3DModelling";
import AdminBookings from "./pages/AdminBookings";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminWorkshops from "./pages/AdminWorkshops";
import AdminPortfolio from "./pages/AdminPortfolio";

function Router() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded">Skip to content</a>
      <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/workshops"} component={Workshops} />
          <Route path={"/products"} component={Products} />
          <Route path={"/portfolio"} component={Portfolio} />
          <Route path={"/about"} component={About} />
          <Route path={"/contact"} component={Contact} />
          <Route path={"/admin/login"} component={AdminLogin} />
          <Route path={"/admin/dashboard"} component={AdminDashboard} />
          <Route path={"/admin/workshops"} component={AdminWorkshops} />
          <Route path={"/admin/portfolio"} component={AdminPortfolio} />
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
    </>
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
