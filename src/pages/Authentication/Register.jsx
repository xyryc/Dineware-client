import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";

const Register = () => {
  const { createNewUser, setUser, setLoading, updateUserProfile } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // get form data
    const form = new FormData(event.target);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");
    // console.log({ name, photo, email, password });

    // password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter and be at least 6 characters long."
      );

      return;
    }

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        // console.log(user);
        toast.success("User registered successfully");

        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            toast.error(err.code);
            // console.log(err.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.code);
        setLoading(false);
      });
  };

  return (
    <div className=" flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-md shrink-0 rounded-md p-10 border">
        <h2 className="font-semibold text-2xl text-center font-bebas-neue">
          Register your account
        </h2>
        <div className="border-b-[1px] mt-8"></div>
        <form className="card-body" onSubmit={handleSubmit}>
          {/* name input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered"
              required
            />
          </div>

          {/* photo url */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter your photo url"
              className="input input-bordered"
              required
            />
          </div>

          {/* email input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="input input-bordered"
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
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-neutral rounded-md">Register</button>
          </div>
        </form>
        <p className="2xl:font-semibold text-center">
          {`Already Have An Account? `}
          <Link className="text-red-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
