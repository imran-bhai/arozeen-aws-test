import { useState } from "react";
import GrayStar from "../iconSVG/GrayStar";
import OrangeStar from "../iconSVG/OrangeStar";

const SelectStarRating = ({ onChange }) => {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleClick = (index) => {
    // Calculate the new count of selected stars
    const newSelectedStars = selectedStars === index ? 0 : index;
    setSelectedStars(newSelectedStars);

    // Call onChange function to pass the count of selected stars to the parent component
    onChange(newSelectedStars);
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} onClick={() => handleClick(index)}>
          {index <= selectedStars ? <OrangeStar /> : <GrayStar />}
        </div>
      ))}
    </div>
  );
};

export default SelectStarRating;
