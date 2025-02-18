
'use client';
import { sanityFetch } from "@/sanity/lib/fetch";
import { allproducts } from "@/sanity/lib/qurries";
import Link from "next/link";
import { Product } from "../../../types/type";
import Image from "next/image";
import { useState, useEffect } from "react";
import { SearchFilter } from "../components/SearchAndFilter";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts: Product[] = await sanityFetch({ query: allproducts });

      // Log the fetched products to check if data is coming correctly
      console.log("Fetched Products:", fetchedProducts);

      if (fetchedProducts.length > 0) {
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    // Reset to page 1 whenever filtering updates
    setCurrentPage(1);
  }, [filteredProducts]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const currentProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Log filtered and current products to check if filtering and pagination are working
  console.log("Filtered Products:", filteredProducts);
  console.log("Current Products:", currentProducts);

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
        Discover Our Products
      </h1>

      {/* Search and Filter Component */}
      <SearchFilter products={products} setFilteredProducts={setFilteredProducts} />

      {currentProducts.length === 0 ? (
        <p className="text-center text-lg text-gray-500 mt-8">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {currentProducts.map((product) => (
            product.slug?.current && (
              <div key={product._id} className="relative flex flex-col border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
                <Link href={`/product/${product.slug.current}`}>
                  <div className="overflow-hidden rounded-t-xl aspect-square">
                    <Image src={product.imageUrl} alt={product.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" width={500} height={500} />
                  </div>
                </Link>
                <div className="flex flex-col p-6 text-center">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">{product.title}</h2>
                  <p className="text-gray-600 text-lg mb-2">RS.{product.price}</p>
                  <Link href={`/product/${product.slug.current}`}>
                    <button className="mt-6 px-8 py-3 bg-blue-600 text-white font-medium text-lg rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Stylish Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg shadow-md flex items-center gap-2 ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-800 text-white hover:bg-gray-900"}`}
          >
            <FaChevronLeft /> Prev
          </button>

          {/* Page Numbers */}
          <span className="flex items-center text-lg text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg shadow-md flex items-center gap-2 ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-800 text-white hover:bg-gray-900"}`}
          >
            Next <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
