import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";

const Login = () => {
  const { userLogin, setUser, signInWithGoogle, setLoading } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  //   const [email, setEmail] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    userLogin(email, password)
      .then((result) => {
        setUser(result.user);
        // console.log(result.user);

        toast.success(`Logged in as ${result.user?.email}`);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.code);
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        // console.log(result.user);
        setUser(result.user);
        toast.success(`Logged in as ${result.user?.email}`);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.code);
        setLoading(false);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //   const handleForgetPassword = () => {
  //     navigate("/forget-password", { state: { email } });
  //   };

  return (
    <div className="flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-md shrink-0 rounded-md p-10 border">
        <h2 className="font-semibold text-2xl text-center font-bebas-neue">
          Login to your account
        </h2>
        <div className="border-b-[1px] mt-8"></div>

        <form onSubmit={handleSubmit} className="card-body ">
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline"
            type="button"
          >
            <FcGoogle /> Login with Google
          </button>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="input input-bordered"
              //   onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
              <button
                className="btn btn-sm absolute right-2 top-2"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {/* <label className="label">
              <button
                onClick={handleForgetPassword}
                className="label-text-alt link link-hover"
                type="button"
              >
                Forgot password?
              </button>
            </label> */}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-neutral rounded-md">Login</button>
          </div>
        </form>
        <p className="2xl:font-semibold text-center">
          {`Don't Have An Account? `}
          <Link className="text-red-500" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
