"use client";

import React from 'react'

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-4'
}

const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClass = sizeMap[size] || sizeMap.md
  return (
    <div
      className={`inline-block rounded-full border-[#651028]/30 border-t-[#651028] animate-spin ${sizeClass} ${className}`}
      role="status"
      aria-label="Loading"
    />
  )
}

export default Spinner
