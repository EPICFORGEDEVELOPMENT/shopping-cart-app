import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "../types/product";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; productId: number };

const CartContext = createContext<
  | (CartState & {
      addToCart: (product: Product) => void;
      removeFromCart: (productId: number) => void;
      getItemQuantity: (productId: number) => number;
      cartCount: number;
    })
  | undefined
>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.items.find(
        (item) => item.id === action.product.id
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: action.product.id,
            title: action.product.title,
            price: action.product.price,
            image: action.product.image,
            quantity: 1,
          },
        ],
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        items: state.items.filter((item) => item.id !== action.productId),
      };
    }
    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", product });
  };
  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", productId });
  };
  const getItemQuantity = (productId: number) => {
    const item = state.items.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };
  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        getItemQuantity,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
