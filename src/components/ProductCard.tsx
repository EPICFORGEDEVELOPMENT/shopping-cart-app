import React from "react";
import { Product } from "../types/product";
import styles from "./ProductCard.module.css";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, getItemQuantity } = useCart();
  const inCart = getItemQuantity(product.id) > 0;

  return (
    <div className={styles.card}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.cardImage}
      />
      <h2 className={styles.cardTitle}>{product.title}</h2>
      <p className={styles.cardDesc} title={product.description}>
        <span className={styles.cardDescInner}>{product.description}</span>
      </p>
      <div className={styles.cardFooter}>
        <span className={styles.cardPrice}>${product.price.toFixed(2)}</span>
        <button
          className={styles.addToCartBtn}
          onClick={() => addToCart(product)}
          disabled={inCart}
        >
          {inCart ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
