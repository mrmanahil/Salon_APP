import "./socket";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginScreen from "./screens/Login/Login.screen";
import HomeScreen from "./screens/Home/Home.screen";
import RootLayout from "./components/Layout/RootLayout";
import UserContextProvider from "./context/UserContext";
import ServiceScreen from "./screens/Service/Service.screen";
import BarberScreen from "./screens/Barber/Barber.screen";
import CategoryScreen from "./screens/Category/Category.screen";
import SettingScreen from "./screens/Setting/Setting.screen";

function App() {
  return (
    <UserContextProvider>
      <ToastContainer
        position="bottom-right"
        progressStyle={{
          backgroundColor: "rgba(var(--color-dark), 1)",
        }}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route element={<RootLayout />}>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/service" element={<ServiceScreen />} />
          <Route path="/barber" element={<BarberScreen />} />
          <Route path="/category" element={<CategoryScreen />} />
          <Route path="/setting" element={<SettingScreen />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
