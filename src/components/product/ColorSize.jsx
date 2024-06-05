"use client";
import React, { useState } from "react";

const ColorSize = ({
  storeInfo,
  firstAttribute,
  setFirstAttribute,
  secondAttribute,
  setSecondAttribute,
  showError,
}) => {
  const handleAddFirstAttribute = (e, name, value) => {
    e.preventDefault();
    setFirstAttribute({ name, value });
  };

  const handleAddSecondAttribute = (e, name, value) => {
    e.preventDefault();
    setSecondAttribute({ name, value });
  };

  return (
    <>
      <div className={`pb-5 ${showError ? "border border-red-700" : ""}`}>
        {storeInfo?.category_attributes.map((attribute, index) => (
          <div key={index} className="mt-5 ml-3">
            <h2 className="font-semibold">{attribute.name}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {attribute.name === "Color"
                ? attribute.values.map((value, i) => (
                    <button
                      key={i}
                      className={`w-6 h-6 rounded-full border ${
                        firstAttribute.value === value ? "border-primary" : ""
                      }`}
                      style={{ backgroundColor: value.toLowerCase() }}
                      onClick={(e) =>
                        handleAddFirstAttribute(e, attribute.name, value)
                      }
                    ></button>
                  ))
                : attribute.values.map((value, i) => (
                    <button
                      key={i}
                      className={`border px-3 py-1 rounded-md hover:bg-gray-100 h-11 w-24 ${
                        secondAttribute.value === value ? "bg-gray-200" : ""
                      }`}
                      onClick={(e) =>
                        handleAddSecondAttribute(e, attribute.name, value)
                      }
                    >
                      {value}
                    </button>
                  ))}
            </div>
          </div>
        ))}
      </div>
      {showError && (
        <h3 className="text-red-700 mb-7 mt-3">Please select attributes</h3>
      )}
    </>
  );
};

export default ColorSize;
