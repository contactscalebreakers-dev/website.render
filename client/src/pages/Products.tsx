import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ShoppingCart, Loader, Filter } from "lucide-react";
import GlitchTitle from "@/components/GlitchTitle";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "3d-model", label: "3D Models" },
  { id: "diorama", label: "Urban Dioramas" },
  { id: "canvas", label: "Canvas Artwork" },
  { id: "other", label: "Other Products" },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: products, isLoading, error } = trpc.products.list.useQuery({
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });
  const { toast } = useToast();

  if (error) {
    console.error("Products query error:", error);
  }

  const checkoutMutation = trpc.payments.createProductCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      toast({
        title: "Checkout Failed",
        description: error.message || "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleBuyNow = (productId: string) => {
    checkoutMutation.mutate({
      productId,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-12">
        <div className="container mx-auto px-4">
          <GlitchTitle as="h1" className="text-4xl md:text-5xl font-bold mb-4">Products</GlitchTitle>
          <p className="text-lg text-gray-700 mb-2">
            Collectible art and 3D figurines available for purchase.
          </p>
          <p className="text-sm text-gray-600">
            Looking for past work? Check out the <Link href="/about" className="text-blue-600 font-semibold hover:underline">About/Portfolio</Link> →
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
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600 mb-2">Error loading products</p>
                  <p className="text-gray-500 text-sm">{error.message}</p>
                </div>
              ) : products && products.length > 0 ? (
                <>
                  <p className="text-gray-600 mb-6">
                    Showing {products.length} product{products.length !== 1 ? "s" : ""}
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col h-full"
                      >
                        {product.imageUrl && (
                          <div className="relative overflow-hidden bg-gray-100 aspect-square">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover hover:scale-105 transition duration-300"
                            />
                            {product.isOneOfOne === "true" && (
                              <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                ✦ One of a Kind
                              </div>
                            )}
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-lg font-bold mb-2 line-clamp-2">{product.name}</h3>
                          {product.description && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {product.description}
                            </p>
                          )}

                          <div className="mb-4 flex items-center justify-between">
                            <div>
                              <p className="text-2xl font-bold text-black">
                                ${product.price}
                              </p>
                            </div>
                            {product.stock && parseInt(product.stock) > 0 && (
                              <p className="text-xs text-gray-500 text-right">
                                {product.stock} in stock
                              </p>
                            )}
                          </div>

                          <Button 
                            className="w-full flex items-center justify-center gap-2"
                            disabled={!product.stock || parseInt(product.stock) === 0 || checkoutMutation.isPending}
                            onClick={() => handleBuyNow(product.id)}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {checkoutMutation.isPending 
                              ? "Processing..." 
                              : product.stock && parseInt(product.stock) > 0 
                                ? "Buy Now - Stripe" 
                                : "Out of Stock"}
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
