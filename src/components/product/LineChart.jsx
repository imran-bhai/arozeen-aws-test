import React from "react";

const LineChart = ({storeInfo}) => {
  const rating5 = 90;
  const rating4 = 80;
  const rating3 = 70;
  const rating2 = 60;
  const rating1 = 50;
  
  const ratings_percentage = storeInfo.ratings_percentage;
  return (
    <>
      <div class="flex items-center font-semibold">
        <div className="mr-2">5</div>
        <div class=" w-24 h-2 bg-gray-200 rounded-full">
          <div
            class="h-2 bg-primary rounded-full"
            style={{ width: `${ratings_percentage["5_star_percentage"]}%` }}
          ></div>
        </div>
      </div>

      <div class="flex items-center font-semibold">
        <div className="mr-2">4</div>
        <div class=" w-24 h-2 bg-gray-200 rounded-full">
          <div
            class="h-2 bg-primary rounded-full"
            style={{ width: `${ratings_percentage["4_star_percentage"]}%` }}
          ></div>
        </div>
      </div>

      <div class="flex items-center font-semibold">
        <div className="mr-2">3</div>
        <div class=" w-24 h-2 bg-gray-200 rounded-full">
          <div
            class="h-2 bg-primary rounded-full"
            style={{ width: `${ratings_percentage["3_star_percentage"]}%` }}
          ></div>
        </div>
      </div>
      <div class="flex items-center font-semibold">
        <div className="mr-2">2</div>
        <div class=" w-24 h-2 bg-gray-200 rounded-full">
          <div
            class="h-2 bg-primary rounded-full"
            style={{ width: `${ratings_percentage["2_star_percentage"]}%` }}
          ></div>
        </div>
      </div>
      <div class="flex items-center font-semibold">
        <div className="mr-2">1</div>
        <div class=" w-24 h-2 bg-gray-200 rounded-full">
          <div
            class="h-2 bg-primary rounded-full"
            style={{ width: `${ratings_percentage["1_star_percentage"]}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default LineChart;
