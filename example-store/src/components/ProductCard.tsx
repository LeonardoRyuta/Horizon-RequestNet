import React from "react";

const ProductCard = ({ product, addToCart }: any) => (
  <div className="border p-4 rounded shadow">
    <img src={product.image} alt={product.name} className="h-40 w-full object-contain mb-4" />
    <h3 className="text-lg font-bold">{product.name}</h3>
    <p className="text-gray-600">{product.description}</p>
    <p className="text-green-500 font-bold my-2">${product.price}</p>
    <button
      onClick={() => addToCart(product)}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Add to Cart
    </button>
  </div>
);

export default ProductCard;
