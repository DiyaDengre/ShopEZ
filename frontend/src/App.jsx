import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <Navigation />
      <main className="py-3 pl-[19px] flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
