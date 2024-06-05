"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/lib/EyeHidden.module.css";
import loginUser, { getToken } from "@/app/config/actions";
import { updateCart, updateWishlist } from "@/app/store/slice/cartSlice";
import { toast } from "react-toastify";

const LoginModal = ({
  refreshPage,
  setRefreshPage,
  id,
  isOpen,
  onClose,
  wishlistItem,
  wishlist,
  setWishlist,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isToken, setIsToken] = useState(null);
  const dispatch = useDispatch();
  const removeWishFlag = useSelector((state) => state.cart.removeWish);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const Token = await getToken();
        setIsToken(Token || null);
      } catch (error) {
        console.error("Error fetching token", error);
      }
    };
    fetchToken();
  }, [removeWishFlag]);

  const onSubmit = async (data) => {
    console.log("data:", data)
    const {email, password} = data;
    console.log("email:", email);
    console.log("password:", password);
    setLoading(true);

    try {
      const response = await loginUser(email, password);
      console.log("Rizwan:", response);

      if (response.status === "success") {
        reset({ email: "", password: "" });

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}create-wishlist`,
            { product_id: id },
            { headers: { Authorization: `Bearer ${response.token}` } }
          );

          if (res.data.code === 200) {
            toast.success("Product added to wishlist");
            setWishlist([...wishlist, id]);

            dispatch(updateCart({ product_id: id, quantity: 1 }));
          } else {
            dispatch(updateWishlist({ product_id: id }));
            toast.error("Failed to add product to wishlist");
          }
        } catch (wishlistError) {
          dispatch(updateWishlist({ product_id: id }));
          // toast.error("wishlist catch");

          console.error("Wishlist error", wishlistError);
        }
        setRefreshPage(!refreshPage);
        onClose();
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (loginError) {
      toast.error("Login failed. Please try again.");
      console.error("Login error", loginError);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-auto md:w-[420px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-center">Please Login</h2>
          <Button
            onClick={onClose}
            className="flex justify-center items-center text-gray-600 hover:text-gray-800 text-2xl"
          >
            &times;
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-black font-normal text-sm mb-1"
            >
              Email
            </label>
            <Input
              type="email"
              {...register("email", { required: "Email is required." })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6 form-field">
            <label className="text-black font-normal text-sm mb-1">
              Password
            </label>
            <div className={`relative ${styles.passwordWrapper}`}>
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required." })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
