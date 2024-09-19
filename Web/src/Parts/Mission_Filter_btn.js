import React,{useState,useEffect} from 'react'

import './Mission_Filter_btn.css'
export default function Mission_Filter_btn({onClick,imgUrl,TypeName,displayType}) {
  if (displayType==="R"){
    return(
        <div className={`Mission_Filter_btn_R_Main_div ${TypeName}`} onClick={onClick} >
            <label>{TypeName}</label>
        </div>
    )
  }else if(displayType==="L"){
    return(
        <div className={`Mission_Filter_btn_L_Main_div ${TypeName}`} onClick={onClick}>
            <label>{TypeName}</label>
        </div>
    )
  }
}
