import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './Plans.css'
import Missions_data from '../../../FakeData.js/Missions_data'
import Mission_btn from '../../../Parts/Mission_btn'
export default function Plans() {
  const [datas,set_datas]=useState(false)
  const navigate=useNavigate()
  function FIND_FROM_MISSION(e){
    let found=false
    for(let i of Missions_data.Missions){
      if (e.name===i.MissionName){
        found=i
      }
    }
    
    return(found)
  }
  useEffect(()=>{
    let data=[]
    let Re=JSON.parse(localStorage.getItem('PLANS'))
    Re=Re[localStorage.getItem('Visitor_name')]
    
    Re.forEach(element => {
      data.push(FIND_FROM_MISSION(element)) 
    });
    set_datas(data)
  },[])
  return (
    <div className='Plans_Main_div'>
      <div className='Top_main_div'>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>

      </div>
      <div className='Bottom_main_div'>
        <div className='Bottom_Scroll_div'>
        {datas&&datas.map((e)=>{
          return(
            <Mission_btn name={e.MissionName} Mid={e.MissionId} onClick={()=>{localStorage.setItem('plan','true');navigate(`/start_mission/${e.MissionName}`)}} dis={e.MissionInfo} displayType={'Large'} />
          )
          
        })}
        </div>
      </div>
    </div>
  )
}
