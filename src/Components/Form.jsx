import React, {useState, useEffect} from 'react'
import Origami from '../images/origami.png'

function Form({getBgFunction, getProfileFunction, getNameFunction,getWriteUpFunction, captureImage}) {



    return (
        <div style={{backgroundImage:`url(${Origami})`}} className='sm:w-3/4 w-full mb-12'>

            <div className='sm:w-3/4 w-full'>

            
            <h1 className="mt-8 text-[#1E6FD9] text-2xl w-full">
            Select  your background image
            </h1>
            <input onChange={getBgFunction} type="file"  placeholder='Choose file to upload' className='mt-2 bg-white border   border-[#0D65D9] p-4 w-full'/>


            <h1 className="mt-8 text-[#1E6FD9] text-2xl">
            Add in your cool  photo
            </h1>
            <input onChange={getProfileFunction} type="file"  placeholder='Choose file to upload' className='mt-2 bg-white border   border-[#0D65D9] p-4 w-full'/>


            <h1 className="mt-8 text-[#1E6FD9] text-2xl">
            Name of attendee
            </h1>
            <input onKeyUp={getNameFunction} type="text"  placeholder='Keep it short and simple like “Caroline”' className='mt-2 bg-white border w-full  border-[#0D65D9] p-4'/>
            
            <h1 className="mt-8 text-[#1E6FD9] text-2xl">
            Additional text written below
            </h1>
            <input onKeyUp={getWriteUpFunction} type="text"  placeholder='Add in your cool “I will be attending” message here' className='mt-2 bg-white border w-full  border-[#0D65D9] p-4'/>


            <div className="grid grid-cols-2 mt-8 gap-8">
                <button className='p-4 bg-[#E5E5E5] hover:bg-[#5C9DF9] text-[#0D65D9]'>
                Download image
                </button>

                <button onClick={captureImage} className='p-4 bg-[#5C9DF2] hover:bg-[#0D65D9] text-white'>
                Create image
                </button>
            </div>

            </div>

        </div>
    )
}

export default Form
