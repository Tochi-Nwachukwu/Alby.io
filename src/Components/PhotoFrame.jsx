import React, { useState, useEffect, useRef, useCallback} from "react";
import Profile from "../images/profile-icon.png";
import {toPng} from 'html-to-image';
import axios from "axios";

function PhotoFrame({ background, profileImage, attendeeName, writeUpText, triggerCount }) {
// MY FUNCTIONS ARE DECLARED HERE
const ref = useRef();

const onButtonClick = useCallback(()=>{
    if(ref.current === null){
        return
    }
    toPng(ref.current, {cacheBust:true}).then ((dataUrl)=>{
        const link =document.createElement('a')
        link.download = `${Math.random()*200}.png`;
        link.href = dataUrl;
        link.click()
    })
    .catch((err) => {
        console.log(err)
      }) 

},[ref]

)

  useEffect(() => {
    onButtonClick();
  }, [triggerCount]);










  return (
    <div
      id="capture"
      ref={ref}
      style={{ backgroundImage:`url(${background})` }}
      className="w-full bg-[#F2F2F2] flex flex-col items-center justify-center border bg-cover border-[#0D65D9] mt-8 sm:h-[620px] sm:w-[620px] h-[360px] w-[360px]"
    >
      <div className=" flex flex-col justiy-center   ">
        <div className="bg-white border-4 border-[#0D65D9] rounded-full flex sm:h-[258px] sm:w-[259px] w-[150px] h-[150px] justify-center items-center ">
          <div
            style={{
              backgroundImage: !profileImage
                ? `url(${Profile})`
                : `url(${profileImage})`,
            }}
            className=" rounded-full sm:w-[220px] sm:h-[220px] w-[120px] h-[120px] bg-cover bg-center"
          ></div>
        </div>
        <div className="bg-blue-400 border-200 text-white border flex justify-center items-center py-4 mt-4 rounded-full">
          {!attendeeName ? "Caroline" : attendeeName}
        </div>
      </div>
      <div className="sm:text-2xl text-sm font-bold sm:mt-16 mt-6 w-3/4 p-4 text-center ">
        {!writeUpText
          ? "I will be attending Microsoft Ignite Cloud Skills Challenge"
          : writeUpText}
      </div>
    </div>
  );
}

export default PhotoFrame;
