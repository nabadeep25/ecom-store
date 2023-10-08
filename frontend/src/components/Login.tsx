import { ChangeEvent, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [role, setRole] = useState<"admin" | "user">("admin");
  const [userId, setUserId] = useState<number>(1);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let userId = parseInt(e.target.value);
    if (userId <= 0) userId = 1;
    setUserId(userId);
  };
  const handleLogin = () => {
    const user = { id: userId, role };
    login(user);
    navigate(`${role == "admin" ? "/admin" : "/"}`);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="card w-96 bg-white shadow-xl p-10">
        <h2 className="text-2xl mb-4 text-black text-center">Login</h2>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">User Role</span>
          </label>
          <select
            className="select select-success  max-w-xs bg-white"
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "user")}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {role == "user" && (
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">User Id</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered input-success bg-white mb-2"
              value={userId}
              onChange={handleChange}
            />
          </div>
        )}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-6"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
