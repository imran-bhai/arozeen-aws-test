import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'

const ThankYouScreen = () => {
  return (
    <MaxWidthWrapper>
    <div className='flex justify-center items-center mt-16'>
         <div className="text-center">
          <h5 className="text-xl font-semibold text-gray-700">
            Thank You &#127881;
          </h5>
          <h4 className="text-3xl font-semibold leading-loose text-primary">
            Your registration is Complete
          </h4>
          <h5 className="text-gray-700">Explore our resources and get started today!</h5>
          <h5 className="text-gray-700">Here&apos;s what to expect next</h5>
    </div>
    </div>
    </MaxWidthWrapper>
  )
}

export default ThankYouScreen
