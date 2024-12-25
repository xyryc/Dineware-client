import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ErrorPage = () => {
  return (
    <div>
      <Navbar />

      <div className="boxShadow px-10 w-full flex items-center flex-col justify-center rounded-xl min-h-screen">
        <img
          src="https://i.ibb.co/SVMTKPy/Frame-5.png"
          alt="illustration"
          className="w-full lg:w-[400px]"
        />
        <p className="text-[#73718A] text-[0.9rem] sm:text-[1.2rem] w-full lg:w-[55%] text-center mt-10 lg:mt-4">
          The page cannot be found. The requested URL was not found on this
          server.
        </p>

        <Link
          to={"/"}
          className="btn btn-outline rounded-full mt-8"
        >
          Back to home
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default ErrorPage;
