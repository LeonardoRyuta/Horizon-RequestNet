import { Link } from "react-router";

const Navbar = () => (
  <nav className="bg-slate-900 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        E-Commerce Store
      </Link>
      <Link to="/checkout" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
        Checkout
      </Link>
    </div>
  </nav>
);

export default Navbar;
