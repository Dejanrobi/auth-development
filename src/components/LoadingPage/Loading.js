import React from 'react'
import "./Loading.css"
import loading from "./loading.svg"

export default function Loading() {
  return (
    <>
        <div className='loading'>
            <img className='loadingImage' src={loading} alt='Loading'/>
        </div>
    </>
  )
}