import React, { Suspense } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import VideoPlayer from "../VideoPlayer";

const WinterCollection = () => {
  return (
    <div className="py-12">
      <MaxWidthWrapper>
        <div className="flex flex-col justify-center items-center ">
          <h2 className="font-semibold text-md">PROMOTION</h2>
          <h3 className="text-primary font-semibold text-2xl lg:text-3xl">
            Winter Collection
          </h3>
          <h4 className="text-gray-600">Introducing the new winter jackets</h4>
        </div>

        <div className="flex justify-center items-center py-12 mx-auto">
          <Suspense>
            <VideoPlayer src={"/Nike.mp4"}/>
          </Suspense>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default WinterCollection;
