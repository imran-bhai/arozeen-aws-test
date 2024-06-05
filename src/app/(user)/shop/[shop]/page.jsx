import ShopMainPage from '@/components/shop/ShopMainPage'
import React from 'react'


const page = ({params}) => {
    const {shop} = params
    
  return (
    <div>
      <ShopMainPage shopId={shop}/>
    </div>
  )
}

export default page
