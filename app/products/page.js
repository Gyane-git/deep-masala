"use client"
import React from 'react'
import ProductListingPage from '@/components/Productlist'
import GlobalBrandsSlider from '@/components/GlobalBrand'

const Productlist = () => {
  return (
    <div className='max-w-7xl mx-auto'> 
    <><GlobalBrandsSlider />
    <ProductListingPage /></>
    </div>
  )
}

export default Productlist