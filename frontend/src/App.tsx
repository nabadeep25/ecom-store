import "./App.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { UserProvider } from "./context/userContex";
import Routes from "./Routes";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Navbar />
        <Routes />
      </UserProvider>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
