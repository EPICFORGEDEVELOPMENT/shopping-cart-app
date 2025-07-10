import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";
import { Product } from "../types/product";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const testProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 10.99,
  description: "A test product",
  category: "test",
  image: "test.jpg",
  rating: { rate: 4.5, count: 10 },
};

test("add to cart and remove from cart", () => {
  const { result } = renderHook(() => useCart(), { wrapper });
  act(() => {
    result.current.addToCart(testProduct);
  });
  expect(result.current.items.length).toBe(1);
  expect(result.current.items[0].id).toBe(testProduct.id);
  act(() => {
    result.current.removeFromCart(testProduct.id);
  });
  expect(result.current.items.length).toBe(0);
});
