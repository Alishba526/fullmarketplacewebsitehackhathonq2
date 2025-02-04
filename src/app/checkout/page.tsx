

'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '../../../types/type';
import { getCartItems, removefromcart, unupdateCartQuantity } from "../action/actions";
import Swal from 'sweetalert2';
import Image from 'next/image';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { client } from '@/sanity/lib/client'; // Import the client

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipcode: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    const fetchCartItems = () => {
      setCartItems(getCartItems());
    };

    fetchCartItems();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const submitOrder = async () => {
    const orderData = {
      _type: 'order',
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      zipcode: formData.zipcode,
      phone: formData.phone,
      email: formData.email,
      productItems: cartItems.map((item) => ({
        _type: 'orderItem',
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      })),
      totalPrice: calculateTotalPrice(),
      status: 'pending', // Default status
      orderDate: new Date().toISOString(),
    };

    try {
      await client.create(orderData);
      Swal.fire('Success', 'Your order has been placed successfully!', 'success');
      localStorage.removeItem('cartItems'); // Clear the cart after successful order
    } catch (error) {
      console.error('Error placing order:', error);
      Swal.fire('Error', `There was an issue placing your order. Please try again. Error: ${(error as Error).message}`, 'error');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitOrder(); // Call the async function
  };

  const handleQuantityChange = (id: string, action: "increment" | "decrement") => {
    unupdateCartQuantity(id, action);
    setCartItems(getCartItems());
  };

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removefromcart(id);
        setCartItems(getCartItems());
        Swal.fire("Removed!", "The item has been removed from your cart.", "success");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="mt-10 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center gap-4">
              <Image
                src={item.imageUrl || '/default.jpg'}
                alt={item.title}
                className="w-32 h-32 object-cover rounded-lg shadow-md"
                width={128}
                height={128}
              />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="font-semibold">₹{item.price}</p>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(item._id, 'decrement')}
                    className="bg-gray-300 text-gray-700 p-3 rounded-full hover:bg-gray-400"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg font-bold">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 'increment')}
                    className="bg-gray-300 text-gray-700 p-3 rounded-full hover:bg-gray-400"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="text-red-600 font-semibold flex items-center space-x-2"
              >
                <FaTrashAlt />
                <span>Remove</span>
              </button>
            </div>
          ))}
          <hr className="my-4" />
          <p className="text-lg font-semibold">Total: <span className="text-blue-600">₹{calculateTotalPrice().toFixed(2)}</span></p>
        </div>

        {/* Billing Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
          <form className="grid gap-3" onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} className="p-2 border rounded" />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} className="p-2 border rounded" />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} className="p-2 border rounded" />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="p-2 border rounded" />
            <input type="text" name="zipcode" placeholder="Zip Code" value={formData.zipcode} onChange={handleInputChange} className="p-2 border rounded" />
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} className="p-2 border rounded" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="p-2 border rounded" />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
