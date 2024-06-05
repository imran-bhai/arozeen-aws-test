import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import ShippingIcon from "../../../public/home/arozeenProvides/shipping.png";
import money from "../../../public/home/arozeenProvides/money.png";
import secure from "../../../public/home/arozeenProvides/secure.png";
import phoneSupport from "../../../public/home/arozeenProvides/phoneSupport.png";
import Image from "next/image";

const ArozeenOffers = [
  {
    icon: ShippingIcon,
    title: "Free Shipping",
    description: "Order above $200",
  },
  {
    icon: money,
    title: "Money Back",
    description: "30 days guarantee",
  },
  {
    icon: secure,
    title: "Secure Payment",
    description: "secured by Stripe",
  },
  {
    icon: phoneSupport,
    title: "24/7 Support",
    description: "Phone and Email support",
  },
];

const ArozeenProvides = () => {
  return (
    <div className="py-12 font-grotesk mx-auto">
      <MaxWidthWrapper>
        <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
          {ArozeenOffers.map((item, index) => (
            <div
              className="basic-1/4 flex flex-col justify-center items-center"
              key={index}
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={25}
                height={25}
                className="py-3"
              />
              <h2 className="font-medium">{item.title}</h2>
              <h3 className="text-gray-700 text-xs">{item.description}</h3>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ArozeenProvides;
