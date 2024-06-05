"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import UserIcon from "@/components/iconSVG/UserIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


const formSchema = {
  email: {
    minLength: 3,
    required: true,
    message: "Email must be at least 2 characters.",
  },
};

export function ForgotForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "" } });

  const onSubmitHandler = async (data) => {
    const { email } = data;

    setIsSubmitting(true);
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}forgot-password`, {
        email,
      });

      if (response.data.code == 400) {
        toast.success(response.data.message);
        setShowPassword(false);
        router.push("/login");
      } else {
        toast.error(`${response.data.message}`);
        setLoading(false);
      }
    } catch (error) {
      console.log("Login Failed", error.message);
      toast.error(error.message);
    }
    // Simulate a delay of 2 seconds before setting isSubmitting to false
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const handleForgot = async () => {
    // await axios.post("/api/users/forgot-password",{email:email})
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col py-10 w-2/3 space-y-5"
    >
      <div className="form-field mt-10">
        <Label htmlFor="email" className="text-black font-normal text-sm mb-1">
          User name or Email
        </Label>
        <div className="relative mt-1">
          <UserIcon className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" />
          <Input
            {...register("email", formSchema.email)}
            className="pl-10 border-0 border-b-[1px] border-gray-800 focus:border-0 rounded-none focus:rounded placeholder:text-gray-400 mb-4"
            id="email"
            placeholder="umair@gmail.com"
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          disable={loading}
          type="submit"
          onClick={(e) => handleForgot(e)}
          className="rounded-full px-12 lg:mb-5 w-40 mt-2"
        >
          Recovery Mail
        </Button>
      </div>

      {/* <div className="text-center text-sm text-gray-400 ">
        Dont have an account?{" "}
        <Link href="/register" className="text-blue-600 font-semibold ">
          Sign up
        </Link>
      </div> */}
    </form>
  );
}
