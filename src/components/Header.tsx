import React from "react";
import styles from "./Header.module.css";
import { HEADER_TITLE } from "../utils/constants";
import { useCart } from "../context/CartContext";

interface HeaderProps {
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { cartCount } = useCart();
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <span className={styles.headerTitle}>{HEADER_TITLE}</span>
        <div className={styles.headerRow}>
          <div
            className={styles.cartIconWrapper}
            title="Cart"
            onClick={onCartClick}
          >
            <svg
              className={styles.cartIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
