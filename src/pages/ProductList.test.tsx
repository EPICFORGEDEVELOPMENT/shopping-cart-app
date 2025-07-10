import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "./ProductList";
import { CartProvider } from "../context/CartContext";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: async () => [
      {
        id: 1,
        title: "Test Product",
        price: 10.99,
        description: "A test product",
        category: "test",
        image: "test.jpg",
        rating: { rate: 4.5, count: 10 },
      },
    ],
  } as any);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("fetches and displays products", async () => {
  render(
    <CartProvider>
      <ProductList />
    </CartProvider>
  );
  await waitFor(() => {
    // Check for image with alt 'Test Product'
    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
    // Check for h2 with class 'cardTitle' and text 'Test Product'
    const title = screen.getByText("Test Product");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H2");
    expect(title).toHaveClass("cardTitle");
  });
  expect(screen.getByText("$10.99")).toBeInTheDocument();
});
