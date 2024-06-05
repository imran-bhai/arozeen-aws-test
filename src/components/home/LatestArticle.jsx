import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import img from "../../../public/home/latestArticle/img.png";
import img1 from "../../../public/home/latestArticle/img1.png";
import img2 from "../../../public/home/latestArticle/img2.png";
import Link from "next/link";
import Image from "next/image";

const Article = [
  {
    img: img,
    title: "2024 Holiday Gift Guide",
    link: "#",
  },
  {
    img: img1,
    title: "2024 Holiday Gift Guide",
    link: "#",
  },
  {
    img: img2,
    title: "2024 Holiday Gift Guide",
    link: "#",
  },
];

const LatestArticle = () => {
  return (
    <div className="flex  justify-center items-center mt-16 lg:mt-12">
      <MaxWidthWrapper className="flex flex-col  lg:flex-col justify-center items-center md:items-start">
        <h3 className="font-poppins text-primary font-semibold text-center md:text-start text-2xl sm:text-3xl ">
          Latest Articles
        </h3>
        <div className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:space-x-5 py-7">
          {Article.map((article, item) => (
            <Link href={article.link} key={item}>
              <div className="py-5 sm:py-0 " key={item}>
                <Image
                  src={article.img}
                  alt={article.title}
                  width={500}
                  height={500}
                  className="object-contain w-full md:h-[320px] lg:h-[350px] xl:h-[370px] "
                />
                <h3 className="font-grotesk text-center md:text-start font-semibold text-md py-2">
                  {article.title}
                </h3>
                <h4 className="font-poppins text-center md:text-start text-sm text-[#214A25] font-normal underline underline-[#214A25] ">
                  Read More&rarr;
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default LatestArticle;
