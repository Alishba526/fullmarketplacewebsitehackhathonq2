
"use client";

import { useState, useEffect } from "react";
import { Product } from "../../../../types/type";
import Swal from "sweetalert2";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { addtocart } from "@/app/action/actions";
import { HeartIcon } from "lucide-react";
import Image from "next/image";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Function to fetch the product from Sanity
const fetchProduct = async (slug: string): Promise<Product | null> => {
  try {
    return client.fetch(
      groq`*[_type == "product" && slug.current == $slug][0]{
        _id,
        name,
        title,
        description,
        price,
        "imageUrl": productImage.asset->url,
        slug
      }`,
      { slug }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const ProductPage = ({ params }: ProductPageProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);

  // Fetch product and initialize state inside useEffect
  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params; 
      const productSlug = resolvedParams.slug;  // Extract the slug from resolved params

      setSlug(productSlug); // Set slug to state

      const data = await fetchProduct(productSlug);  // Fetch product by slug
      if (data) {
        setProduct(data);

        // Check if the product is in favorites
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
          const favorites: Product[] = JSON.parse(savedFavorites);
          const isFavorite = favorites.some((fav) => fav._id === data._id);
          setIsFavorited(isFavorite);
        }
      }
    };

    fetchData();

    // Update cart count from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cart: Product[] = JSON.parse(savedCart);
      setCartCount(cart.length);
    }
  }, [params]);  // Dependency array ensures this only runs when `params` changes

  // Add to cart functionality
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      title: `${product.title} added to cart`,
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });

    addtocart(product);

    // Update cart count
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cart: Product[] = JSON.parse(savedCart);
      setCartCount(cart.length);
    }
  };

  // Toggle favorite
  const handleFavoriteToggle = () => {
    setIsFavorited((prev) => !prev);
    const savedFavorites = localStorage.getItem("favorites");
    let favorites: Product[] = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (isFavorited && product) {
      favorites = favorites.filter((fav) => fav._id !== product._id);
    } else if (product) {
      favorites.push(product);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Show SweetAlert on favorite toggle
    Swal.fire({
      position: "center",
      title: isFavorited ? "Removed from Favorites" : "Added to Favorites",
      icon: isFavorited ? "error" : "success",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        loading...
      </div>
    );
  }

  const shortDescription = product.description.substring(0, 150) + "...";

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square flex items-center justify-center bg-gray-100 rounded-lg shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.title}
            height={500}
            width={500}
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="mt-4 text-2xl font-semibold text-blue-600">
              RS {product.price}
            </p>
          </div>

          {/* Short Description */}
          <p className="mt-4 text-gray-700">
            {isDescriptionExpanded ? product.description : shortDescription}
            <button
              className="text-blue-600 ml-2"
              onClick={() => setIsDescriptionExpanded((prev) => !prev)}
            >
              {isDescriptionExpanded ? "Show Less" : "Read More"}
            </button>
          </p>

          {/* Add to Cart Button */}
          <button
            className="mt-6 w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium text-lg rounded-md shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={(e) => handleAddToCart(e, product)}
          >
            Add to Cart
          </button>

          {/* Favorite Heart Icon */}
          <div className="mt-4">
            <HeartIcon
              className={`w-6 h-6 cursor-pointer ${
                isFavorited ? "text-red-500" : "text-gray-500"
              }`}
              onClick={handleFavoriteToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
