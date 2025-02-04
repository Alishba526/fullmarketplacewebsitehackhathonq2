'use client'
import { useState, useEffect } from "react";
import { Menu, ShoppingCart, Heart } from 'lucide-react'; 
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import { Product } from "../../../types/type";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allproducts } from "@/sanity/lib/qurries";
import { SearchFilter } from "./SearchAndFilter";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]); // Store products here

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    setShopDropdownOpen(false);
  };

  const toggleShopDropdown = () => {
    setShopDropdownOpen(prev => !prev);
  };


  return (
    <ClerkProvider>
      <nav className="bg-white shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">
          
          {/* Left Side: Menu Icon and Logo */}
          <div className="flex items-center space-x-4">
            <Menu
              size={30}
              className="cursor-pointer sm:hidden"
              onClick={toggleMenu}
            />
            <Link href="/" className="text-3xl font-bold text-gray-800 hover:text-gray-600 transition duration-300">E-commerce</Link>
          </div>
          
          {/* Center: Shop Dropdown and Other Buttons */}
          <div className="hidden sm:flex space-x-6 mx-auto">
            {/* Shop Dropdown */}
            <div className="relative">
              <button 
                className="px-2 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300"
                onClick={toggleShopDropdown}
              >
                Shop
              </button>
              {shopDropdownOpen && (
                <div className="absolute top-12 left-0 w-full bg-white shadow-md rounded-lg transition-all duration-300">
                  <ul>
                    <li>
                      <Link href="/" className="block px-4 py-2 text-gray-800 hover:text-gray-600">Clothing</Link>
                    </li>
                    <li>
                      <Link href="/productlist" className="block px-4 py-2 text-gray-800 hover:text-gray-600">Products</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Other Buttons */}
            <Link href="/" className=" py-2 rounded-full hover:bg-gray-100 transition duration-300">Home</Link>
            <Link href="/price" className="py-2 rounded-full hover:bg-gray-100 transition duration-300">Price</Link>
            <Link href="/contact" className=" py-2 rounded-full hover:bg-gray-100 transition duration-300">Contact</Link>
            <Link href="/productlist" className="px-2 py-2 rounded-full hover:bg-gray-100 transition duration-300">ProductList</Link>

          </div>


          {/* Right Side: Login/Register, Icons */}
          <div className="flex items-center space-x-2">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <div className="flex items-center space-x-4">
              <Link href="/favorites">
                <Heart size={24} className="cursor-pointer text-gray-700 hover:text-gray-500 transition duration-300" />
              </Link>
              <Link href="/cart">
                <ShoppingCart size={24} className="cursor-pointer text-gray-700 hover:text-gray-500 transition duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`sm:hidden ${menuOpen ? 'block' : 'hidden'} bg-gray-100 transition-all duration-300`}>
          <div className="flex flex-col items-center space-y-2 p-4">
            <Link href="/" className="text-black font-semibold" onClick={toggleMenu}>Home</Link>
            <Link href="/productlist" className="text-black font-semibold" onClick={toggleMenu}>Shop</Link>
            <Link href="/price" className="text-black font-semibold" onClick={toggleMenu}>Price</Link>
            <Link href="/contact" className="text-black font-semibold" onClick={toggleMenu}>Contact</Link>
          </div>
        </div>
      </nav>
    </ClerkProvider>
  );
}
