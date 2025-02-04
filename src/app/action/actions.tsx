



import { Product } from "../../../types/type";

// Helper function to safely interact with localStorage
const getLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("cart");
  }
  return null;
};

const setLocalStorage = (cart: Product[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const addtocart = (product: Product) => {
  const cart = JSON.parse(getLocalStorage() || "[]");

  const existingIndex = cart.findIndex((item: { _id: string }) => item._id === product._id);

  if (existingIndex > -1) {
    // If the item already exists, increase quantity
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 }); // Add product with initial quantity 1
  }

  setLocalStorage(cart);
};

export const removefromcart = (productId: string) => {
  const cart: Product[] = JSON.parse(getLocalStorage() || "[]");
  const updatedCart = cart.filter((item) => item._id !== productId);
  setLocalStorage(updatedCart);
};

export const unupdateCartQuantity = (productId: string, action: "increment" | "decrement") => {
  const cart = JSON.parse(getLocalStorage() || "[]");
  const productIndex = cart.findIndex((item: { _id: string }) => item._id === productId);

  if (productIndex > -1) {
    if (action === "increment") {
      cart[productIndex].quantity += 1;  // Increment quantity
    } else if (action === "decrement") {
      // Ensure quantity does not go below 1
      if (cart[productIndex].quantity > 1) {
        cart[productIndex].quantity -= 1;  // Decrement quantity
      }
    }
  }

  setLocalStorage(cart);  // Save updated cart to localStorage
};

export const getCartItems = (): Product[] => {
  const cart = JSON.parse(getLocalStorage() || "[]");
  return cart;
};
