import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

const Main = () => {
  return (
    <div className="font-poppins">
      <Navbar />

      <ScrollToTop />
      {/* Outlet */}
      <div className="min-h-[calc(100vh-340px)]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Main;
