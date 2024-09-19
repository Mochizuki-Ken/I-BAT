import React,{useState,useEffect,createContext} from 'react'
import './Trains.css'
//firebase
import firebase from "./../../API/API.js";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
//react-icons
import {BiCaretLeft} from 'react-icons/bi'
import TrainsMain from './Page/TrainsMain';
import TrainsInside from './Page/TrainsInside';
import TrainsInfo from './Page/TrainsInfo';
import Missions_data from '../../FakeData.js/Missions_data';
export const Trains_Context=createContext(null)


export default function Trains() {
  const [state,set_state]=useState({page:0,passedLabelState:"MISSIONS",labelState:"MISSIONS",MissionID:false})//main,inside,info
  const pageLabel=[]
  return (
    <div className='Trains_Main_div'>
      <div className='Top_Main_div'>
        {state.page>=1&&<BiCaretLeft className='icon' onClick={()=>{set_state({page:state.page-1,passedLabelState:state.passedLabelState,labelState:state.passedLabelState,MissionID:false})}}/>}
        <label>{state.labelState}</label>
      </div>
      <Trains_Context.Provider value={{state,set_state,Missions_data}}>
      {state.page===0&&<TrainsMain />}
      {state.page===1&&<TrainsInside/>}
      {state.page===2&&<TrainsInfo/>}
      </Trains_Context.Provider>
    </div>
  )
}
