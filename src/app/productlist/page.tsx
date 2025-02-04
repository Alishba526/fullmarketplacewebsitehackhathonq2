

import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import React from 'react';
import Image from 'next/image';
import Footer from "../components/Footer";
import Home from "../cards/page";

const products = [
  { id: 1, name: 'Product 1', price: 10.99, image: '/card-item (1).png' },
  { id: 2, name: 'Product 2', price: 20.99, image: '/card-item (2).png' },
  { id: 3, name: 'Product 3', price: 30.99, image: '/card-item (3).png' },
  { id: 4, name: 'Product 4', price: 40.99, image: '/col-md-4 (1).png' },
  { id: 5, name: 'Product 5', price: 50.99, image: '/col-md-4 (2).png' },
  { id: 6, name: 'Product 6', price: 60.99, image: '/card-item.png' },
  { id: 7, name: 'Product 7', price: 70.99, image: '/a.png' },
  { id: 8, name: 'Product 8', price: 80.99, image: '/b.png' },
  { id: 9, name: 'Product 9', price: 90.99, image: '/c.png' },
  { id: 10, name: 'Product 10', price: 100.99, image: '/d.png' },
  { id: 11, name: 'Product 11', price: 110.99, image: '/e.png' },
  { id: 12, name: 'Product 12', price: 120.99, image: '/f.png' }
];

const Products = () => {
  return (
    <div className="container mx-auto">

      {/* Product Listing */}
      <div className="flex justify-center mt-8 space-x-4 flex-wrap">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="w-60 h-80 bg-white shadow-lg rounded-lg mb-8">
            <Image
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover rounded-t-lg"
              width={240}
              height={240}
            />
          </div>
        ))}
      </div>

      {/* Showing Results and Buttons */}
      <div className="flex items-center justify-between mb-14">
        <div className="flex items-center gap-8">
          <h1 className="font-semibold text-2xl mt-0 ml-12">Showing all 12 results</h1>
          <h2 className="font-semibold text-2xl mt-0 text-center">Views</h2>
        </div>
        <div className="flex items-center gap-2">
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Popularity</button>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Filter</button>
        </div>
      </div>

      {/* Bandage and Social Icons */}
      <div>
       
        <h1 className="font-semibold text-2xl mt-0 ml-12">Bandage</h1>

        {/* Social Media Icons on the right */}
        <div className="flex justify-end gap-4 mt-4">
          <FaFacebookF className="text-blue-500" />
          <FaTwitter className="text-blue-400" />
          <FaInstagram className="text-pink-500" />
        </div>
      </div>

      {/* Footer Section */}
      <Footer />

      {/* Home Section */}
      <div className="mt-10">
        <Home />

      
              <footer className="p-4">
               
              </footer>
         
        </div>
      </div>
  );
};

export default Products;
