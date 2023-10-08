import { useAuth } from "../context/authContext";
import { useUserContext } from "../context/userContex";
import { Item } from "../types";
import Rating from "./Rating";
type ItemProps = {
  item: Item;
  handleAddToCart: (id: number) => void;
};

const ItemCard = ({ item, handleAddToCart }: ItemProps) => {
  return (
    <div className=" card border bg-slate-100 p-2 m-2">
      {/* Item image */}
      <figure>
        <img
          src={item.image}
          alt="Shoes"
          className="object-cover h-36 w-full"
        />
      </figure>
      {/* card body */}
      <div className="card-body p-2">
        <h3>{item.name}</h3>
        <p>Price: {item.price}</p>
        <p>Stock: {item.stock}</p>
        {/* Rating */}
        <Rating rating={5} />
        {/* Card action area */}
        <div className="flex justify-end">
          <button
            onClick={() => handleAddToCart(item.id)}
            disabled={item.stock === 0}
            className={`rounded bg-primary text-white px-2 py-1 ${
              item.stock === 0 && "opacity-50 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ItemList: React.FC = () => {
  const { items, addToUserCart } = useUserContext();
  const { user } = useAuth();
  // adding item to user cart
  const handleAddToCart = (itemId: number, quantity: number = 1) => {
    if (user?.id) {
      const payload = {
        itemId,
        userId: user?.id,
        quantity: quantity,
      };
      addToUserCart(payload);
    }
  };

  return (
    <div>
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
