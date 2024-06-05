"use client";
import Image from "next/image";
import React, { useState } from "react";
import BackgroundImg from "../../../public/home/newsletters/bg.jpg";
import EmailIcon from "../../../public/home/newsletters/email-Icon.png";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "react-toastify";

const Newsletters = () => {
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}subscribe`,
        {
          email: email,
        }
      );
      if (response.data.code == 200) {
        setEmail("");
        toast.success("Email sent successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <div className="min-w-full  relative">
      <Image
        src={BackgroundImg}
        alt="Newsletter"
        priority={true}
        className="object-fit min-w-full h-60"
      />
      <div className="absolute flex flex-col justify-center items-center top-[40%] sm:top-[50%] md:top-[40%]  md:left-[30%] lg:left-[40%] left-[10%] mx-auto sm:left-[35%]">
        <h3 className="text-secondary text-xl sm:text-2xl font-bold ">
          Join Our Newsletter
        </h3>
        <h5 className="text-secondary text-sm sm:text-md">
          Sign up for deals, new products and promotions
        </h5>
        <div className="flex flex-col py-4 w-full">
          <div className="relative mt-1 ">
            <Image
              src={EmailIcon}
              alt="Email Icon"
              width={20}
              height={20}
              className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400"
            />
            <h6
              onClick={(e) => handleSubmit(e)}
              className="absolute cursor-pointer right-3 top-[10px] text-sm text-primary "
            >
              Send
            </h6>

            <Input
              className="pl-10  rounded-lg border-gray-400  focus:border-0  
           placeholder:text-secondary bg-black mb-1 text-secondary"
              id="email"
              placeholder="Enter your email"
              type="email"
              maxlength="30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* {errors.email && (
              <p className="text-red-500 text-xs ">{errors.email}</p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletters;
