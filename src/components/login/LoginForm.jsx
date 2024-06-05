"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserIcon from "../iconSVG/UserIcon";
import LockIcon from "../iconSVG/LockIcon";
import EyeIcon from "../iconSVG/EyeIcon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@hookform/error-message";
import styles from "@/lib/EyeHidden.module.css"; // Import the CSS module
import loginUser from "@/app/config/actions";

const LoginForm = ({ prevPath, quantity }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const id = parseInt(prevPath.split("/").pop());


  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmitHandler = async (data) => {
    const { email, password } = data;
    setIsSubmitting(true);
    try {
      // const response = await axios.post("/api/users/login", {
      //   email,
      //   password,
      // });

      const response = await loginUser(email, password);
     console.log("loginResponse:", response)

      if (response.code === 200) {
        setShowPassword(false);

        // Get the token from the response
        const token = response.token;

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}add-to-cart`,
            {
              product_id: id,
              quantity: quantity,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // Handle the response from the "add-to-cart" API call
        } catch (error) {
          console.log(error);
        }

        if (prevPath) {
          router.push(prevPath);
        } else {
          router.push("/");
          router.refresh();
        }

        setTimeout(function () {
          toast.success("Login Successfully");
        }, 300);

        setIsSubmitting(false);
      } else {
        toast.error(`${response.data.message}`);

        setIsSubmitting(false);
      }
    } catch (error) {
      console.log("Login Failed", error.message);
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col py-10 w-2/3 space-y-1"
    >
      <div className="form-field">
        <Label htmlFor="email" className="text-black font-normal text-sm mb-1">
          User name or Email
        </Label>
        <div className="relative mt-1">
          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            {...register("email", { required: "This is required." })}
            className="pl-10 border-0 border-b-[1px] border-gray-800 focus:border-0 rounded-none focus:rounded placeholder:text-gray-400 mb-1"
            id="email"
            placeholder="umair@gmail.com"
          />
          <div className="text-red-600">
            <ErrorMessage errors={errors} name="email" />
          </div>
        </div>
      </div>
      <div className="form-field">
        <Label htmlFor="password" className="text-black font-normal mb-1">
          Password
        </Label>
        <div className={`relative mt-1 ${styles.passwordWrapper}`}>
          <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <EyeIcon />
          </div>
          <Input
            {...register("password", { required: "Password is required" })}
            className="pl-10 pr-10 border-0 border-b-[1px] border-gray-800 focus:border-0 rounded-none focus:rounded placeholder:text-gray-400 mb-1"
            id="password"
            placeholder="********"
            type={showPassword ? "text" : "password"}
          />
          <div className="text-red-600">
            <ErrorMessage errors={errors} name="password" />
          </div>
        </div>
      </div>
      <Link href="/forgot-password">
        <p className="font-semibold text-sm flex justify-end mt-3 text-blue-600 cursor-pointer">
          Forgot password?
        </p>
      </Link>
      <div className="flex justify-center">
        <Button
          disabled={isSubmitting}
          type="submit"
          className="rounded-full px-12 lg:mb-5 w-40 mt-8"
        >
          Sign In
        </Button>
      </div>
      <div className="text-center text-sm text-gray-400">
        Dont have an account?{" "}
        <Link href="/signup" className="text-blue-600 font-semibold">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
