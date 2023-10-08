import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">E-STORE </div>
        {user && (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
