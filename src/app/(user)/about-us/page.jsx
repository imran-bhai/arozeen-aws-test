"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import React from "react";

const page = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="w-[70%] m-auto">
          <h2 className="text-5xl font-semibold py-5 ">About Us</h2>
          <p className="">
            Welcome to Arozeen.com – your go-to destinations for quality
            products and hassle-free shopping. We keep it simple: great
            products, fair prices, and an commitment to your satisfaction.
          </p>
          <div className="text-base font-semibold py-5">Our Mission</div>
          <p className="">
            We&apos;re on a mission to make your online shopping experience
            straightforward and enjoyable. No frills, just the products you love
            delivered to your doorstep with care.
          </p>
          <div className="text-base font-semibold  py-5">What we offer</div>
          <ul className="list-disc ml-10 ">
            <li className="mb-3">
              Quality Products: We believe in quality over quantity. Every
              product on our platform meets our high standards.
            </li>
            <li className="mb-3">
              Fair Prices: Transparent and fair pricing is our promise. No
              hidden fees, just great value for your money.
            </li>
            <li className="mb-3">
              Satisfaction Guaranteed: Your satisfaction is our top priority. We
              aim to make every interaction positive, from browsing to delivery.
            </li>
          </ul>
          <div className="text-base font-semibold  py-5">
            Why Choose YourStoreName.com?
          </div>
          <ul className="list-disc ml-10 ">
            <li className="mb-3">
              Diverse Selection: Explore a wide range of categories, from
              fashion to electronics. We cater to your diverse tastes and
              preferences.
            </li>
            <li className="">
              Customer-Centric Approach: We&apos;re here for you. Our customer
              support team is ready to assist, ensuring a smooth and hassle-free
              shopping experience.
            </li>
          </ul>
          <div className="text-base font-semibold  py-5">Meet the Team</div>
          <p className="">
            Behind Arozeen.com is a dedicated team working to make your shopping
            experience exceptional. We&apos;re not just a faceless platform –
            we&apos;re real people committed to serving you better.
          </p>
          <div className="text-base font-semibold  py-5">Founders Name</div>
          <p>
            Meet [Daniyal Aamir], the driving force behind Arozeen.com. With a
            passion for quality and affordability,
          </p>
          <div className="text-base font-semibold  py-5">Get in Touch</div>
          <p className="">
            We&apos;re here for you. If you have any questions, concerns, or
            just want to say hello, feel free to reach out to us.
          </p>
          <p className="">
            [Contact Information: Include links to your Contact Us page and
            social media profiles.]
          </p>
          <p className="py-5">
            Thank you for choosing Arozeen.com. We look forward to being your
            trusted online shopping destination.
          </p>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default page;
