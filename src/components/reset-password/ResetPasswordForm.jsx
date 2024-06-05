"use client";
import EyeIcon from "@/components/iconSVG/EyeIcon";
import LockIcon from "@/components/iconSVG/LockIcon";
import UserIcon from "@/components/iconSVG/UserIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";



const formSchema = {
  password: {
    minLength: 2,
    maxLength: 20,
    required: true,
    message: "Email must be at least 2 characters.",
  },
  confirmPassword: {
    required: true,
    minLength: 8,
    message: "Password is required.",
  },
};

export function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { password: "", confirmPassword: "" } }); // Corrected typo in confirmPassword

  const onSubmitHandler = async (data) => {
    const { password, confirmPassword } = data;
   
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`, {
        token: "",
        password: password,
        confirmPassword: confirmPassword, // Corrected object key typo
      });
      if (response.data.code === 200) { // Corrected comparison operator
        toast.success("Login Successfully");
        setShowPassword(false);
        router.push("/");
      } else {
        toast.error(`${response.data.message}`);
      }
    } catch (error) {
      console.log("Login Failed", error.message);
      toast.error(error.message);
    }
    setLoading(false);
  };

 
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col py-10 w-2/3 space-y-1">
      <div className="form-field">
        <Label htmlFor="password" className="text-black font-normal mb-1">
          Password
        </Label>
        <div className="relative mt-1">
          <LockIcon className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" />
          {showPassword ? (
            <div className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-400 cursor-pointer">
              <EyeIcon onClick={togglePasswordVisibility} className="" />
            </div>
          ) : (
            <div className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-400 cursor-pointer">
              <EyeIcon onClick={togglePasswordVisibility} className="" />
            </div>
          )}

          <Input
            {...register("password", formSchema.password)}
            className="pl-10 border-0 border-b-[1px] border-gray-800 focus:border-0 rounded-none focus:rounded placeholder:text-gray-400 mb-4"
            id="password"
            placeholder="********"
            type={showPassword ? "text" : "password"}
          />
        </div>
      </div>
      <div className="form-field">
        <Label htmlFor="confirmPassword" className="text-black font-normal mb-1">
          Confirm Password
        </Label>
        <div className="relative mt-1">
          <LockIcon className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" />
          {showConfirmPassword ? (
            <div className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-400 cursor-pointer">
              <EyeIcon onClick={toggleConfirmPasswordVisibility} className="" />
            </div>
          ) : (
            <div className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-400 cursor-pointer">
              <EyeIcon onClick={toggleConfirmPasswordVisibility} className="" />
            </div>
          )}

          <Input
            {...register("confirmPassword", formSchema.confirmPassword)}
            className="pl-10 border-0 border-b-[1px] border-gray-800 focus:border-0 rounded-none focus:rounded placeholder:text-gray-400 mb-4"
            id="passwordComfirm"
            placeholder="********"
            type={ showConfirmPassword ? "text" : "password"}
          />
        </div>
      </div>
     
      <div className="flex justify-center">
        <Button
          disable={loading}
          type="submit"
          className="rounded-full px-12 lg:mb-5 w-40 mt-8">
          Reset Password
        </Button>
      </div>
    </form>
  );
}
