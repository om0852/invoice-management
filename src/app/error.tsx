"use client"
import React from 'react'
import NextError from "next/error";
const Error = ({error}:{error:Error}) => {
  return (
    <div>
        <NextError statusCode={500} title={error.message} />
      {/* {error.message} */}
    </div>
  )
}

export default Error
