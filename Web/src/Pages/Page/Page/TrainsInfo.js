import React,{useContext, useState,useEffect} from 'react'
import './TrainsInfo.css'
import { Trains_Context } from '../Trains';
import { useNavigate } from 'react-router-dom';
//firebase
import firebase from "./../../../API/API.js";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
//Mid,ImgUrl,VideoUrl,MissionName,MissionDis,MissionType,MissionLevel
export default function TrainsInfo({}) {
  const{state,set_state,Missions_data}=useContext(Trains_Context)
  const[data,setData]=useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
    Missions_data.Missions.forEach(element => {
      
      if(element.MissionName===state.MissionID){
        console.log(element)
        setData(element)
      }
      
    });
  },[])
  return (
    <>
    {data&&<div className='TrainsInfo_Main_div'>
      <div className='Top_Main_div'>
        <div className={`img ${data.MissionId}_B`}></div>
        <div className='div'>
          <div>
            <label className='long'>{data.MissionType.toString()}</label>


            <label>{data.MissionLevel}</label>
            <label>Exp +200</label>
          </div>
        </div>
      </div>
      <div className='Middle_Main_div'>
        <button onClick={()=>{
           navigate(`/start_mission/${data.MissionName}`)
        }}>START MISSION</button>

      </div>
      <div className='Bottom_Main_div'>
        <p>
        {data.MissionInfo}
        </p>
      </div>
    </div>}
    </>
  )
}
