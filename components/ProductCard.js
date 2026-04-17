export const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    onAddToCart(product);
  };

  return (
    // ... JSX igual
  );
};
