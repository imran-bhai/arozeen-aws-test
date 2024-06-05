import React from 'react'





const HeadingSection = (props) => {
  return (
    <div className="mt-16">
    <h3 className="flex justify-center text-blue-700 text-sm font-semibold pb">
      {props.sectionName}
    </h3>
    <h2 className={`flex justify-center mt-3 mb-8 text-3xl md:text-4xl font-bold ${props.headingStyle}`} >
      {props.heading}
    </h2>
  </div>
  )
}

export default HeadingSection
