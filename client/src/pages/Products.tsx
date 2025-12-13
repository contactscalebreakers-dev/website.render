import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader, Filter } from "lucide-react";
import GlitchTitle from "@/components/GlitchTitle";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "toys", label: "Designer Toys" },
  { id: "art", label: "Art & Prints" },
  { id: "murals", label: "Mural Commissions" },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/data/products.json')
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader, Filter } from "lucide-react";
import GlitchTitle from "@/components/GlitchTitle";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "toys", label: "Designer Toys" },
  { id: "art", label: "Art & Prints" },
  { id: "murals", label: "Mural Commissions" },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load products:', err);
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-12">
        <div className="container mx-auto px-4">
          <GlitchTitle as="h1" className="text-4xl md:text-5xl font-bold mb-4">Shop</GlitchTitle>
          <p className="text-lg text-gray-700 mb-2">
            Original artwork and collectibles available for purchase right now.
          </p>
          <p className="text-sm text-gray-600">
            Looking for past work? Check out the <Link href="/portfolio" className="text-blue-600 font-semibold hover:underline">Portfolio</Link> →
          </p>
        </div>
      </section>

      {/* Products Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:w-48 flex-shrink-0">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-20">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCategory === category.id
                          ? "bg-black text-white font-medium"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              ) : filteredProducts.length > 0 ? (
                <>
                  <p className="text-gray-600 mb-6">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col h-full"
                      >
                        <div className="relative overflow-hidden bg-gray-100 aspect-square">
                          <img
                            src={`/${product.image}`}
                            alt={product.title}
                            className="w-full h-full object-cover hover:scale-105 transition duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-bold mb-2 line-clamp-2">{product.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {product.description}
                          </p>
                          <div className="mb-4">
                            <p className="text-2xl font-bold text-black">
                              ${product.price}
                            </p>
                          </div>
                          <Button 
                            className="w-full flex items-center justify-center gap-2"
                            onClick={() => toast({ title: "Contact Us", description: "Email contact.scalebreakers@gmail.com to purchase" })}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No products in this category.</p>
                  <p className="text-gray-500">Check back soon for new items!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
