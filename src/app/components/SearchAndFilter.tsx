import { useState } from "react";
import { Product } from "../../../types/type";

interface SearchFilterProps {
  products: Product[];
  setFilteredProducts: (products: Product[]) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ products, setFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<number>(120); // Max price limit

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterProducts(value, priceRange);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceRange(value);
    filterProducts(searchTerm, value);
  };

  const filterProducts = (search: string, price: number) => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(search) && product.price <= price
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between bg-gray-100 p-4 rounded-lg">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
      />

       Price Range Slider
      <div className="flex items-center gap-2">
        <label className="text-gray-700">Max Price: ${priceRange}</label>
        <input
          type="range"
          min="100"
          max="100"
   step="100"
     value={priceRange}
     onChange={handlePriceChange}
     className="cursor-pointer"
    />
        </div>    
        </div>

  );
};
