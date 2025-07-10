import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";
import styles from "./ProductList.module.css";
import Header from "../components/Header";
import {
  FAKESTORE_API_URL,
  TOAST_PRODUCTS_LOADED,
  ERROR_LOAD_PRODUCTS,
  NO_PRODUCTS_FOUND,
  SCROLL_TO_TOP_TITLE,
  HEADER_TITLE,
} from "../utils/constants";
import { useCart } from "../context/CartContext";

const Toastr: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => (
  <div
    style={{ position: "fixed", top: 24, right: 24, zIndex: 1000 }}
    className="bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in"
  >
    {message}
    <button
      onClick={onClose}
      style={{
        marginLeft: 16,
        color: "white",
        background: "none",
        border: "none",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      ×
    </button>
  </div>
);

const ScrollToTop: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        right: 32,
        bottom: 32,
        zIndex: 1000,
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: 48,
        height: 48,
        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
        fontSize: 28,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s",
      }}
      title={SCROLL_TO_TOP_TITLE}
    >
      ↑
    </button>
  );
};

const CartSummary: React.FC = () => {
  const { items, removeFromCart } = useCart();
  return (
    <aside className={styles.cartSummary}>
      <div className={styles.cartSummaryTitle}>
        {HEADER_TITLE.replace("Shopping Cart", "Cart")}
      </div>
      {items.length === 0 ? (
        <div className={styles.cartEmpty}>Your cart is empty.</div>
      ) : (
        items.map((item) => (
          <div className={styles.cartItem} key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              className={styles.cartItemImg}
            />
            <div className={styles.cartItemInfo}>
              <div className={styles.cartItemTitle}>{item.title}</div>
              <div className={styles.cartItemPrice}>
                ${item.price.toFixed(2)}
              </div>
            </div>
            <button
              className={styles.cartRemoveBtn}
              onClick={() => removeFromCart(item.id)}
              title="Remove"
            >
              ×
            </button>
          </div>
        ))
      )}
    </aside>
  );
};

const CartOverlay: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { items, removeFromCart } = useCart();
  if (!open) return null;
  return (
    <div className={styles.cartOverlay}>
      <div className={styles.cartOverlayContent}>
        <button
          className={styles.cartOverlayClose}
          onClick={onClose}
          title="Close"
        >
          ×
        </button>
        <div className={styles.cartSummaryTitle}>Cart</div>
        {items.length === 0 ? (
          <div className={styles.cartEmpty}>Your cart is empty.</div>
        ) : (
          items.map((item) => (
            <div className={styles.cartItem} key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.cartItemImg}
              />
              <div className={styles.cartItemInfo}>
                <div className={styles.cartItemTitle}>{item.title}</div>
                <div className={styles.cartItemPrice}>
                  ${item.price.toFixed(2)}
                </div>
              </div>
              <button
                className={styles.cartRemoveBtn}
                onClick={() => removeFromCart(item.id)}
                title="Remove"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToastr, setShowToastr] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [cartOverlayOpen, setCartOverlayOpen] = useState(false);

  useEffect(() => {
    fetch(FAKESTORE_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        setShowToastr(true);
        setTimeout(() => setShowToastr(false), 2500);
      })
      .catch((err) => {
        setError(ERROR_LOAD_PRODUCTS);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Determine if we are on mobile/tablet
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 900;

  if (loading)
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header onCartClick={() => isMobile && setCartOverlayOpen(true)} />
      {showToastr && (
        <Toastr
          message={TOAST_PRODUCTS_LOADED}
          onClose={() => setShowToastr(false)}
        />
      )}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
        <section className={styles.productGrid} style={{ flex: 1 }}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                color: "#888",
                fontSize: 20,
              }}
            >
              {NO_PRODUCTS_FOUND}
            </div>
          )}
        </section>
        {/* Show cart summary only on desktop */}
        {!isMobile && <CartSummary />}
      </div>
      <CartOverlay
        open={cartOverlayOpen}
        onClose={() => setCartOverlayOpen(false)}
      />
      <ScrollToTop show={showScroll} />
    </>
  );
};

export default ProductList;
