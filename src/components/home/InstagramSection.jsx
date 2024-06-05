import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import img1 from "../../../public/home/Instragram/img1.png";
import img2 from "../../../public/home/Instragram/img2.png";
import img3 from "../../../public/home/Instragram/img3.png";
import img4 from "../../../public/home/Instragram/img4.png";
import Image from "next/image";

const InstaImages = [img1, img2, img3, img4];

const InstagramSection = () => {
  const profileUrlFacebook =
    "https://www.facebook.com/profile.php?id=61557087341528";
  const postUrlInstagram = "https://www.instagram.com/p/CUTjHk2JHQe/";

  return (
    <div className="flex justify-center items-center">
      <MaxWidthWrapper>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-semibold text-2xl">Instagram</h2>
          <h3 className="text-center md:text-start text-gray-700 font-normal text-md py-2">
            Follow us on social media for more discount & promotions
          </h3>
          <h4 className="text-primary pb-3 font-semibold py-2">
            @Arozeen_official
          </h4>

          <div className="flex gap-x-6 justify-center w-full py-4">
            <div className="flex justify-center w-full">
              <iframe
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                  profileUrlFacebook
                )}&tabs=timeline&width=500&height=680&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                width="500"
                height="680"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="yes"
                frameBorder="0"
                allowTransparency="true"
                allow="encrypted-media"
              ></iframe>
            </div>
            <div className="flex justify-center w-full h-full">
              <iframe
                src={`https://www.instagram.com/arozeenofficial/embed`}
                width="400"
                height="480"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                allow="encrypted-media"
              ></iframe>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
            {InstaImages.map((img, index) => (
              <div className="mx-auto sm:py-5 md:py-3 lg:py-0" key={index}>
                <Image
                  src={img}
                  alt={`Instagram image ${index + 1}`}
                  width={260}
                  height={260}
                  className="object-fill"
                />
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default InstagramSection;
