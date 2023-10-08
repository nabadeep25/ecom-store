import { AdminProvider } from "../context/adminContext";
import AdminStats from "./AdminStats";

const AdminDashboard = () => {
  return (
    <AdminProvider>
      <AdminStats />
    </AdminProvider>
  );
};

export default AdminDashboard;
