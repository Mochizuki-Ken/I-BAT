import React,{useState,useEffect,createContext} from 'react'
import './RecordAndPlans.css'
import Record from './Page/Record'
import Plans from './Page/Plans'

import{BsFillCalendarCheckFill,BsFillCalendar2MinusFill} from 'react-icons/bs'
export default function RecordAndPlans() {
  const [state,set_state]=useState("Record")
  return (
    <div className='RecordAnsPlans_Main_div'>
      <div className='Top_Main_div'>
        <button onClick={()=>{set_state('Record')}}><BsFillCalendarCheckFill/><label>Records</label></button>
        <button onClick={()=>{set_state('Plan')}} ><BsFillCalendar2MinusFill/><label>TrainPlans</label></button>
      </div>
      {state==="Record"&&<Record/>}
      {state==="Plan"&&<Plans/>}
    </div>
  )
}
