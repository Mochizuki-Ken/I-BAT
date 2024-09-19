import React,{useState,useEffect,useContext} from 'react'
import './TrainsMain.css'
import { Trains_Context } from '../Trains';
//firebase
import firebase from "./../../../API/API.js";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import Mission_Filter_btn from '../../../Parts/Mission_Filter_btn';

export default function TrainsMain() {
    const{state,set_state,Missions_data}=useContext(Trains_Context)
    useEffect(()=>{
      set_state({page:state.page,passedLabelState:state.passedLabelState,labelState:"Missions",MissionID:state.MissionID})
        
    },[])
  return (
    <div className='TrainsMain_Main_div'>
      <div className='TrainsMain_scroll_div'>
        <Mission_Filter_btn displayType={'L'} TypeName={"HOT"} onClick={()=>{set_state({page:state.page+1,passedLabelState:"MISSIONS",labelState:"HOT",MissionID:state.MissionID})}}/>
        <Mission_Filter_btn displayType={'L'} TypeName={'ALL'}  onClick={()=>{set_state({page:state.page+1,passedLabelState:"MISSIONS",labelState:"ALL",MissionID:state.MissionID})}}/>
        {Missions_data.Mission_Type.map((e,index)=>{
          return(
            <Mission_Filter_btn key={index} TypeName={e.type} displayType={'R'} onClick={()=>{set_state({page:state.page+1,passedLabelState:"MISSIONS",labelState:e.type,MissionID:state.MissionID})}}/>
          )
        })}
        
      </div>
    </div>
  )
}
