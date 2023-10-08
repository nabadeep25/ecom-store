import CheckoutModal from "./CheckoutModal";
import ItemList from "./Itemlist";

const Home = () => {
  return (
    <div>
      {/* Item list */}
      <ItemList />
      {/* Checkout popup */}
      <CheckoutModal />
    </div>
  );
};

export default Home;
