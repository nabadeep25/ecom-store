import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [role, setRole] = useState<"admin" | "user">("user");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    const user = { id: "1", role };
    login(user);
    navigate(`${role == "admin" ? "/admin" : "/"}`);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="card w-54 bg-white shadow-xl p-10">
        <h2 className="text-2xl mb-4 text-black text-center">Login</h2>
        <div className="flex items-center mb-4">
          <label className="mr-2">Role:</label>
          <select
            className="select select-success  max-w-xs bg-white"
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "user")}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
