import React, { useEffect, useState } from "react";
import "./pages.css";

const Pages = () => {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(1);

  const fetchProduct = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      if (data && data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const selectpagehandler = (selectedpage) => {
    setIndex(selectedpage);
  };

  return (
    <div>
      {products.length > 0 ? (
        <div className="products">
          {products.slice(index * 10 - 10, index * 10).map((product) => (
            <span key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
            </span>
          ))}
        </div>
      ) : (
        <p>Loading products...</p>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span>◀️</span>
          {[...Array(Math.ceil(products.length / 10))].map((_, i) => (
            <span key={i} onClick={() => selectpagehandler(i + 1)}>
              {i + 1}
            </span>
          ))}
          <span>▶️</span>
        </div>
      )}
    </div>
  );
};

export default Pages;
