import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. 
          It might have been moved or deleted.
        </p>
        <Link href="/">
          <Button size="lg">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
