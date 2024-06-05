import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

export default function page() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="w-[70%] m-auto">
          <div className="flex justify-center items-center ">
            <h2 className="text-4xl font-semibold py-5 ">Refund Policy</h2>
          </div>
          <div className="">
            <p className="py-3 text-sm leading-loose">
              We understand that sometimes your expectations may differ from the
              received product, and at Arozeen.com, we want to ensure your
              satisfaction. Here&apos;s our straightforward and customer-centric
              return and refund policy:
            </p>
          </div>
          <div className="">
            <p className="py-3 text-lg font-semibold">5-Day Return Period</p>
            <p className="py-3 leading-7">
              We offer a 5-day return period from the date you receive your
              order. If within this time frame you find that the product
              doesn&apos;t meet your expectations or has any defects, we are
              here to assist you.
            </p>
          </div>
          <div className="">
            <p className="py-3 text-2xl font-semibold">Hassle-Free Returns</p>
            <p className="py-3">
              To initiate a return, please follow these steps:
            </p>
            <ul className="list-disc pl-10">
              <li className="py-1">
                Contact Us: Reach out to us via email at arozeenhelp@gmail.com
                or WhatsApp us at +92 308 0336141 within the 5-day period,
                stating the reason for the return.
              </li>
              <li className="py-1">
                Return Approval: Our customer support team will guide you
                through the return process and provide you with a return
                authorization if the conditions are met.
              </li>
              <li className="py-1">
                Packaging: Ensure the product is unused, in its original
                packaging, and includes all accessories.
              </li>
              <li className="py-1">
                Return Shipment: Ship the product back to us using a reliable
                courier service.
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="py-3 text-2xl font-semibold">
              Full Refund Guarantee
            </h3>
            <p className="py-3">
              Once we receive and inspect the returned item and approve the
              return, we will initiate a full refund of the order amount. Please
              allow 3 business days for the refund to be processed.
            </p>
          </div>
          <div className="">
            <h3 className="py-3 text-2xl font-semibold">
              Common Conditions for Return and Refund Approval
            </h3>
            <p className="py-3">
              To ensure a smooth return and refund process, please note the
              following conditions:
            </p>
            <ul className="list-disc pl-10 space-y-2">
              <li>
                Unused Condition: The product must be unused and in its original
                packaging.
              </li>
              <li>
                Initiate Within 5 Days: The return must be initiated within the
                specified 5-day period from the date of receiving the order.
              </li>
              <li>
                Approval Process: Returns are subject to approval by our
                customer support team.
              </li>
              <li>
                Product Integrity: The product must be in resalable condition
                with all accessories included.
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="py-3 text-2xl font-semibold">
              Unpacking Video Recommendation
            </h3>
            <p className="py-3 leading-7">
              To expedite the return approval process, we recommend creating an
              unpacking video when you receive your order. This video can serve
              as evidence in case there are any discrepancies or defects. Please
              include clear footage of unboxing, showcasing the product, and
              highlighting any concerns.
            </p>
          </div>
          <div className="">
            <h3 className="py-3 text-2xl font-semibold">
              Our Commitment to Your Satisfaction
            </h3>
            <p className="py-3 leading-7">
              Your satisfaction is our top priority at YourStoreName.com. We are
              dedicated to providing a hassle-free and transparent return
              process because we care about your shopping experience. If you
              have any questions or concerns, our friendly customer support team
              is here to assist you.
            </p>
            <h3 className="py-3">
              Thank you for choosing YourStoreName.com. Happy shopping!
            </h3>
          </div>
        </div>
      </MaxWidthWrapper>
      
    </>
  );
}
