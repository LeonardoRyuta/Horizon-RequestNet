import ProductCard from "../components/ProductCard";

const products = [
  { id: 1, name: "Product 1", description: "Description 1", price: 19.99, image: "./coffee beans.jpg" },
  { id: 2, name: "Product 2", description: "Description 2", price: 29.99, image: "./coffee grinder.jpg" },
  { id: 3, name: "Product 3", description: "Description 3", price: 39.99, image: "./coffee machine.jpg" },
];

const Storefront = ({ addToCart }: any) => (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  </div>
);

export default Storefront;
