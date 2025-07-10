import React from "react";
import ProductList from "./pages/ProductList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8">
        <ProductList />
      </main>
    </div>
  );
};

export default App;
