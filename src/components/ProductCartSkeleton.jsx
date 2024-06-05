import React from 'react'
import { SkeletonCard } from '@/components/SkeletonCard'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

const ProductCartSkeleton = () => {
  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {"abcdefg".split("").map((index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}

export default ProductCartSkeleton
