import React,{useContext,useState,useEffect} from 'react'
import './TrainsInside.css'
import { Trains_Context } from '../Trains';
//firebase
import firebase from "./../../../API/API.js";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import Mission_btn from '../../../Parts/Mission_btn';
export default function TrainsInside() {
  const{state,set_state,Missions_data}=useContext(Trains_Context)
  const [data,setData]=useState([])
  useEffect(()=>{
    
    if (state.labelState==="ALL"){
      setData(Missions_data.Missions)
      console.log(Missions_data.Missions)
      console.log(data)
    }else if (state.labelState==="HOT"){
      let arr=[]
      Missions_data.Missions.forEach(element => {
        if (element.MissionType.includes(state.labelState) ){
          arr.push(element)
        }
      });
      setData(arr)
    }else{
      let arr=[]
      Missions_data.Missions.forEach(element => {
        if (element.MissionType.includes(state.labelState) ){
          arr.push(element)
        }
      });
      setData(arr)
    }
  },[])
  
  return (
    <div className='TrainsInside_Main_div'>
      <div className='Scroll_div'>
        {data.map((e)=>{
          return(
            <Mission_btn Mid={e.MissionId} name={e.MissionName} dis={e.MissionInfo} displayType={'Large'} onClick={()=>{set_state({page:state.page+1,MissionID:true,passedLabelState:state.labelState,labelState:e.MissionName,MissionID:e.MissionName})}}/>
          )
          
        })}

      </div>
    </div>
  )
}
