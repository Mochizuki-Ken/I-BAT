import React,{useState,useEffect,useContext}from 'react'
import { Auth_context } from './../../App';
import './Main.css'
//firebase
import firebase from "./../../API/API.js";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import { useNavigate } from 'react-router-dom';
import {GiFireball} from 'react-icons/gi'
import {BsFillCapslockFill,BsFillBarChartFill} from 'react-icons/bs'
import {IoFootsteps} from 'react-icons/io5'
import {IoTimer} from 'react-icons/io5'
import {AiOutlineSetting,AiOutlineAim} from 'react-icons/ai'
import {RiGlobalLine} from 'react-icons/ri'
//Part
import Mission_btn from '../../Parts/Mission_btn';
import Setting from '../../Parts/Setting';
export default function Main() {
  const moveTo=useNavigate()
  const {user,set_user}=useContext(Auth_context)
  const [state,set_state]=useState({TopD2:1,SET:false})
  const [data,set_data]=useState({
    MissionCount:0,
    Area:{PERSONAL_AVARAGE:{A:0,B:0,C:0},PN:0},
    Score:{PERSONAL_AVARAGE:0,Score:0},
    Hit:{PERSONAL_AVARAGE:0},
    React:{PERSONAL_AVARAGE:0},
    Step:0,
    Total:0,
    Next:{name:false,mid:false}
  })
  function LoadData(){
    if(JSON.parse(localStorage.getItem('RECORDS'))!==null){
      let Re=JSON.parse(localStorage.getItem('RECORDS'))
    let PERSONAL=Re[localStorage.getItem('Visitor_name')]
    let data={
      MissionCount:0,
      Area:{PERSONAL_AVARAGE:{A:0,B:0,C:0},PN:0},
      Score:{PERSONAL_AVARAGE:0,Score:0},
      Hit:{PERSONAL_AVARAGE:0},
      React:{PERSONAL_AVARAGE:0},
      Step:0,
      Total:0,
      Next:{name:false,mid:false}
    }
    for (let i of PERSONAL){
      data.MissionCount+=1
      data.Area.PERSONAL_AVARAGE.A+=i.A
      data.Area.PERSONAL_AVARAGE.B+=i.B
      data.Area.PERSONAL_AVARAGE.C+=i.C
      data.Score.PERSONAL_AVARAGE+=i.scores
      data.Hit.PERSONAL_AVARAGE+=parseFloat(i.HT);
      data.React.PERSONAL_AVARAGE+=parseFloat(i.RT);
    }
    data.Score.Score=data.Score.PERSONAL_AVARAGE
    data.Area.PERSONAL_AVARAGE.A/=PERSONAL.length
    data.Area.PERSONAL_AVARAGE.B/=PERSONAL.length
    data.Area.PERSONAL_AVARAGE.C/=PERSONAL.length

    let AreaAvA=0
    AreaAvA+=data.Area.PERSONAL_AVARAGE.A*5
    AreaAvA+=data.Area.PERSONAL_AVARAGE.B*2
    AreaAvA+=data.Area.PERSONAL_AVARAGE.C
    let AreaAvA2=0
    AreaAvA2+=(data.Area.PERSONAL_AVARAGE.A*5)+(data.Area.PERSONAL_AVARAGE.B*5)+(data.Area.PERSONAL_AVARAGE.C*5)

    data.Area.PN=(AreaAvA/AreaAvA2)*100

    data.Score.PERSONAL_AVARAGE/=PERSONAL.length
    data.Score.PERSONAL_AVARAGE=(data.Score.PERSONAL_AVARAGE/1500)*100
    data.Hit.PERSONAL_AVARAGE/=PERSONAL.length
    data.Hit.PERSONAL_AVARAGE=(data.Hit.PERSONAL_AVARAGE/100)*100
    data.React.PERSONAL_AVARAGE/=PERSONAL.length
    data.React.PERSONAL_AVARAGE=Math.abs((0.5/data.React.PERSONAL_AVARAGE))*100
    data.Step=((data.Area.PN+data.Hit.PERSONAL_AVARAGE+data.React.PERSONAL_AVARAGE+data.Score.PERSONAL_AVARAGE-15)/4)
    data.Total=((data.Area.PN+data.Hit.PERSONAL_AVARAGE+data.React.PERSONAL_AVARAGE+data.Score.PERSONAL_AVARAGE+data.Step)/5)
    
    let Pl=JSON.parse(localStorage.getItem('PLANS'))
    
    if(Pl!==null && Pl[localStorage.getItem('Visitor_name')].length>0){data.Next.name = Pl[localStorage.getItem('Visitor_name')][0].name;data.Next.mid = Pl[localStorage.getItem('Visitor_name')][0].mid}
    if( Pl[localStorage.getItem('Visitor_name')].length===0){data.Next.name="Position!" ;data.Next.mid='ms06'}
    set_data(data)
    console.log(data)
    }
    
    
  }
  useEffect(()=>{
    
    LoadData()
  },[])
  function Level(e,T){
    if(T===1){
      if(e>=10000){
        return("level01.png")
      }else if(e>=5000){
        return("level04.png")
      }else if(e>=3000){
        return("level03.png")
      }else{
        return("level02.png")
      }
    }else{
      if(e>=100000){
        return("level04.png")
      }else if(e>=5000){
        return("level03.png")
      }else if(e>=3000){
        return("level02.png")
      }else{
        return("level01.png")
      }
      
    }
    
  }
 
  function PLAYSOUND(){
    let audio=new Audio()
    audio.src=require('./../../Media/Sound.mp3')
    audio.play()
  }
  if(data)return (
    <div className='Main_Main_div'>
        {state&&state.SET&&<Setting />}
        <div className='Top_Main_div'>
          <div className='d1'>     
          {user.state==="visitor"&&<label className='user_name'>{user.name}</label>}
            {user.state==="visitor"&&<label className='user_login_type' onClick={()=>{localStorage.removeItem('Visitor_name');set_user({state:false})}}>VISITOR</label>}
            <AiOutlineSetting  onClick={()=>{if(!state.SET){set_state({...state,SET:true})}else{set_state({...state,SET:false})};}} style={{position:'absolute',right:'10px',top:'5px',fontSize:"4vh"}} />
          </div>
          <div className='d2'>
            {state.TopD2===1&&<div className='d21'>
              <div className='d211'>
                <div className='pre_level_logo' ></div>
                <img src={require(`./../../Media/${Level(data.Score.Score)}`)} width={'90px'}/>
                <img className='next_level_logo' src={require(`./../../Media/${Level(data.Score.Score,1)}`)} width={'75px'}/>
              </div>
              <div className='d212'>
                <label>{data.Score.Score}</label>
              </div>
            </div>}
            {state.TopD2===2&&<div className='d22'>
            <div></div>
            <div></div>
            <div></div>
            </div>}
          </div>
          
          {data.Next&&data.Next.name&&<div className='d3'>
            <label className='text'>NEXT MISSION</label>
            <div className='d31'>
              <Mission_btn name={data.Next.name} Mid={data.Next.mid} dis={"Hit the Ball to the target Area!"} onClick={()=>{moveTo(`/start_mission/${data.Next.name}`)}} displayType={"Small"}/>
            </div>
          </div>}
        </div>
        <div className='Middle_Main_div'>  
          <div className='d1'>
            <label>Total Effort</label>
          </div>
          <div className='d2'>
            <label>This Month</label>
            <div className='d21'>
              <div className='d211'>
                <div className='div'>
                  <label>{data.MissionCount}</label>
                  <p>Complet</p>
                </div>
                <div className='div'>
                  <label>{data.MissionCount*100}%<BsFillCapslockFill className='UP_icon'/></label>
                  <p>Activity</p>
                </div>
                <div className='div'>
                  <label>{data.Score.Score}%<BsFillCapslockFill className='UP_icon'/></label>
                  <p>Score</p>
                </div>
              </div>
              <div className='d212'>
                <div className='div'>
                  <label>{Math.round((data.Area.PN)*10)}%<BsFillCapslockFill className='UP_icon'/></label>
                  <p>Accuracy</p>
                </div>
                <div className='div'>
                  <label>{Math.round(((data.React.PERSONAL_AVARAGE+data.Hit.PERSONAL_AVARAGE)/2)*10)}%<BsFillCapslockFill className='UP_icon'/></label>
                  <p>React&Hit</p>
                </div>
                <div className='div'>
                  <label>{Math.round(data.Total*10)}%<BsFillCapslockFill className='UP_icon'/></label>
                  <p>Overrall</p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className='Bottom_Main_div'>
            <div className='d1'>
              <label>Skill Rating</label>
            </div>
            <div className='d2'>
              <div className='d21'>
                <div>
                  <BsFillBarChartFill className='icon'/>
                  <label>SCORE LEVEL</label>
                  <p>
                    {Math.round(data.Score.PERSONAL_AVARAGE)}%
                  </p>
                </div>
                <div>
                  <GiFireball className='icon'/>
                  <label>HIT LEVEL</label>
                  <p>{Math.round(data.Hit.PERSONAL_AVARAGE)}%</p>
                </div>
                <div>
                  <AiOutlineAim className='icon'/>
                  <label>ACCURACY LEVEL</label>
                  <p>{Math.round(data.Area.PN)}%</p>
                </div>
              </div>
              <div className='d22'>
                <div>
                  <IoTimer className='icon'/>
                  <label>REACT LEVEL</label>
                  <p>{Math.round(data.React.PERSONAL_AVARAGE)}%</p>
                </div>
                <div>
                  <IoFootsteps className='icon'/>
                  <label>STEP LEVEL</label>
                  <p>{Math.round(data.Step)}%</p>
                </div>
                <div>
                  <RiGlobalLine className='icon'/>
                  <label>OVERRALL LEVEL</label>
                  <p>{Math.round(data.Total)}%</p>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
