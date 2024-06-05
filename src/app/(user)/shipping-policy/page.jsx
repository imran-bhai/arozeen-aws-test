import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

const page = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="w-[70%] m-auto">
          <div className="flex justify-center items-center ">
            <h2 className="text-4xl font-semibold py-5 ">Shipping Policy</h2>
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold">
              Shipping All Across Pakistan
            </h3>
            <p className="py-3 leading-7">
              At Arozeen.com, we&apos;re committed to delivering your favourite
              products to every corner of India. We offers free shipping on all
              orders, ensuring that you enjoy a seamless shopping experience
              without any additional costs.
            </p>
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold">Next Day Dispatch</h3>
            <p className="py-3 leading-7">
              At Arozeen.com, we&apos;re committed to delivering your favourite
              products to every corner of India. We offer free shipping on all
              orders, ensuring that you enjoy a seamless shopping experience
              without any additional costs.We take pride in our prompt service.
              Your order is our priority, and we aim to dispatch it within 24
              hours of receiving your order confirmation. This quick turnaround
              ensures that you get your hands on your desired items as soon as
              possible.
            </p>
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold">Trusted Courier Parters</h3>
            <p className="py-3 leading-7">
              To guarantee a reliable and secure delivery, we have partnered
              with some of India&apos;s most trusted courier companies. Your
              package is in safe hands, and we ensure that it reaches you in
              pristine condition.
            </p>
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold">Fast Shipping Times</h3>
            <p className="py-3 leading-7">
              We understand the anticipation that comes with online shopping.
              That&apos;s why we&apos;ve optimized our shipping process to
              provide you with fast shipping times of 3 to 5 days. Your order
              will be on its way to you shortly after you place it.
            </p>
            <h3 className="text-xl font-semibold">Track Your Order</h3>
            <p className="py-3 leading-7">
              Stay informed about the status of your shipment with our
              easy-to-use tracking system. Once your order is dispatched,
              you&apos;ll receive a tracking number via email. Alternatively,
              use your order ID on our &apos;Track Your Order&apos; page to
              monitor your package&apos;s journey right from our store to your
              doorstep.
            </p>
            <h3 className="text-xl font-semibold">Order Cancellation</h3>
            <p className="py-3 leading-7">
              We understand that plans can change. If you need to cancel your
              order, please do so promptly. To cancel, email us at
              arozeenhelp@gmail.com or WhatsApp us at +92 308 0336141 within 24
              hours of placing your order. Unfortunately, orders cannot be
              cancelled once they are shipped.
            </p>
            <p className="py-3 leading-7">
              Your satisfaction is our priority, and our shipping policy is
              crafted to ensure a smooth and transparent experience for you. If
              you have any questions or need further assistance, feel free to
              reach out to our dedicated customer support team.{" "}
            </p>
            <p className="py-3">Happy Shipping!</p>
          </div>
        </div>
      </MaxWidthWrapper>
     
    </>
  );
};

export default page;
