import React,{useState} from 'react'
import './Mission_btn.css'
import {AiOutlineCheckCircle} from 'react-icons/ai'
export default function Mission_btn({imgUrl,name,dis,Mid,displayType,onClick}) {
  const dic={Small:"Mission_btn_S_Main_div",Middle:"Mission_btn_M_Main_div",Large:"Mission_btn_L_Main_div",
  DoneS:"Mission_btn_SD_Main_div",DoneL:"Mission_btn_LD_Main_div"}
  return (
    <div className={`${dic[displayType]} ${Mid}`} onClick={onClick}> 
        {/* <img src={require('../Media/Mission01.jpg')} width={'30%'}/>  */}
        <div className='div'>
        
          <div className='div2'>
          <label className='mission_name'>{name}</label>
          {displayType!=='Small'&&<label className='exp'>EXP +200</label>}
          {displayType==='DoneL'&&<AiOutlineCheckCircle className='icon'/>}
          </div>
            
            <p>{dis}</p>
        </div>
    </div>
  )
}
