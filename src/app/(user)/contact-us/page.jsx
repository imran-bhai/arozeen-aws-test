import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ContactForm from "@/components/contact-us/ContactForm";
import Link from "next/link";
import React from "react";


const page = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="w-[70%] m-auto">
          <div className="">
            <h2 className="text-5xl font-semibold py-5 ">Contact Us</h2>
            <p className="py-5 text-gray-600">
              Please read our{" "}
              <Link href="/shipping-policy" className="text-blue-800 ">
                <span className="underline"> SHIPPING FAQS </span>
              </Link>
              before contacting us, chances are we&apos;ve answered your
              question there.
            </p>
            <p className="py-3 text-gray-600">
              If you&apos;d like to return something you can find our{" "}
              <Link href="/refund-policy" className="text-blue-800 ">
                <span className="underline">RETURN & REFUND POLICY HERE.</span>
              </Link>
            </p>
            <p className="py-3 text-gray-600">
              If you have a question about your order status{" "}
              <Link href="orders" className="text-blue-800 ">
                <span className="underline">TRACK YOUR ORDER HERE.</span>
              </Link>
            </p>
            <p className="py-3 text-gray-600">
              If you still need our assistance please contact us below.
            </p>
          </div>
          <ContactForm />
        </div>
      </MaxWidthWrapper>
     
    </>
  );
};

export default page;
