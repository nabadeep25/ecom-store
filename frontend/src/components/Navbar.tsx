import { ShoppingCart } from "lucide-react";
import { useAuth } from "../context/authContext";
import { useUserContext } from "../context/userContex";
import { useEffect } from "react";
const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart, toggleShowCheckout, getCart } = useUserContext();

  // fetching cart when new user login
  useEffect(() => {
    if (user?.id) getCart(user.id);
  }, [user]);

  return (
    <nav className="bg-blue-500 p-2">
      <div className=" flex justify-between items-center">
        <div className="text-white font-bold text-lg">E-STORE </div>
        <div className="flex items-center p-1">
          {/* cart icon with badge */}
          {user?.role == "user" && (
            <div
              className="relative bg-white mr-4 p-1 rounded"
              onClick={toggleShowCheckout}
            >
              <ShoppingCart />{" "}
              <div className="badge badge-secondary absolute -top-2 -right-5">
                {cart.length}
              </div>
            </div>
          )}
          {/* user/admin logout button */}
          {user && (
            <button
              onClick={logout}
              className="mx-2 align-middle  bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
