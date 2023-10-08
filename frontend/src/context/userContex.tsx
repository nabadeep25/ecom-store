import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { Cart, Checkout, Item } from "../types";
import {
  fetchAllItems,
  fetchUsercart,
  addToCart,
  checkout,
} from "../services/userService";
import toast from "react-hot-toast";

type UserCart = {
  quantity: number;
  itemId: number;
  item: Item;
};

type UserContextType = {
  items: Item[];
  cart: UserCart[];
  isLoading: boolean;
  addToUserCart: (payload: Cart) => void;
  userCheckout: (payload: Checkout) => void;
  toggleShowCheckout: () => void;
  showCheckout: boolean;
  getCart: (userId: number) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState<UserCart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  const toggleShowCheckout = () => {
    setShowCheckout((prev) => !prev);
  };
  useEffect(() => {
    fetchAllItems()
      .then((data) => {
        setItems(data.items);
        setIsLoading(false);
      })
      .catch((_error) => {
        setIsLoading(false);
      });
  }, []);

  const getCart = (userId: number) => {
    fetchUsercart(userId)
      .then((data) => {
        setCart(data.cart);
        setIsLoading(false);
      })
      .catch((_error) => {
        setIsLoading(false);
      });
  };
  const addToUserCart = (payload: Cart) => {
    addToCart(payload)
      .then((data) => {
        toast.success(data.message ?? "Item added to cart");
        getCart(payload.userId);
      })
      .catch((_error) => {
        toast.error("failed to add Item to the cart");
      });
  };
  const userCheckout = (payload: Checkout) => {
    checkout(payload)
      .then((data) => {
        toast.success(data.message ?? "Order placed successfully");
        getCart(payload.userId);
        setIsLoading(false);
        toggleShowCheckout();
      })
      .catch((_error) => {
        setIsLoading(false);
      });
  };

  return (
    <UserContext.Provider
      value={{
        cart,
        items,
        isLoading,
        userCheckout,
        addToUserCart,
        showCheckout,
        toggleShowCheckout,
        getCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
