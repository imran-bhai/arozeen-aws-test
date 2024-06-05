"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}contact-us`,
        data
      );

      if (response.data.code == 200) {
        router.push("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-5">
      <p className="">* For a faster reply please include your order number</p>
      <div className="flex gap-x-5 py-5 min-w-screen">
        <div className="flex flex-col basis-1/2">
          <Input
            placeholder="Name"
            className="rounded-xl"
            type="text"
            minLength="3"
            maxLength="31"
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          <div className="text-red-500 text-sm">
            <ErrorMessage errors={errors} name="name" />
          </div>
        </div>
        <div className="flex flex-col basis-1/2">
          <Input
            id="email"
            type="email"
            maxLength="30"
            placeholder="Email *"
            {...register("email", { required: "Email is required" })}
            className="rounded-xl"
          />
          <div className="text-red-500 text-sm">
            <ErrorMessage errors={errors} name="email" />
          </div>
        </div>
      </div>
      <div className="">
        <Input
          id="phone"
          type="text"
          maxLength="30"
          placeholder="Phone number"
          {...register("phone", { required: "Phone is required" })}
          className="rounded-xl w-full "
        />
        <div className="text-red-500 text-sm">
          <ErrorMessage errors={errors} name="phone" className="" />
        </div>
      </div>
      <div className="py-5">
        <Textarea
          id="message"
          type="text"
          maxLength="500"
          placeholder="Message"
          className=" rounded-xl w-full "
          {...register("message", { required: "Message is required" })}
        />
        <div className="text-red-500 text-sm">
          <ErrorMessage errors={errors} name="message" />
        </div>
      </div>
      <div className="flex justify-center sm:justify-normal">
        <Button
          disabled={isSubmitting}
          type="submit"
          className="rounded-xl sm:rounded-2xl w-full sm:w-32 py-1 px-10"
        >
          Send
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
