import  { ChangeEvent, useState } from "react";
import { useUserContext } from "../context/userContex";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { Checkout } from "../types";
import { X } from "lucide-react";

const CheckoutModal = () => {
  const { cart, userCheckout, toggleShowCheckout, showCheckout } =
    useUserContext();
  const { user } = useAuth();
  const [code, setCode] = useState("");

  const handleCheckout = () => {
    if (user?.id) {
      const payload: Checkout = { userId: user.id };
      if (code) {
        payload.discountCode = code;
      }
      userCheckout(payload);
      setCode("");
    } else {
      toast.error("Please login first");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0
    );
  };

  const total = calculateTotal();

  if (showCheckout) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur ">
        <div className="bg-white w-1/3 p-4 shadow-lg rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
            <X onClick={toggleShowCheckout} />
          </div>
          <ul>
            {cart.map((cartItem) => (
              <li key={cartItem.itemId} className="mb-2 flex items-center">
                <img
                  src={cartItem.item.image}
                  alt={cartItem.item.name}
                  className="w-20 h-16 object-cover mr-2 rounded"
                />
                {cartItem.item.name} - {cartItem.item.price} x{" "}
                {cartItem.quantity} ={cartItem.item.price * cartItem.quantity}
              </li>
            ))}
          </ul>
          <p className="mt-4">Total: {total}</p>
          {cart.length < 1 && (
            <div className="alert alert-warning p-1 rounded">
              <span>Cart is empty! Please add items </span>
            </div>
          )}
          <input
            value={code}
            onChange={handleChange}
            placeholder="Discount code"
            className={`input input-bordered w-full max-w-xs bg-white mt-2 ${
              cart.length < 1 ? "pointer-events-none" : ""
            }`}
          />
          <div className="mt-4 flex justify-end">
            <button
              className={` bg-green-500 text-white py-2 px-4 ml-2 rounded ${
                cart.length < 1 ? "btn-disabled" : ""
              }`}
              onClick={handleCheckout}
              disabled={cart.length < 1}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default CheckoutModal;
