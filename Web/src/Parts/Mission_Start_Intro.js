import React,{ useState } from 'react'
import './Mission_Start_Intro.css'
export default function Mission_Start_Intro({MID,SET}) {
    const [Timer,set_Timer]=useState(4)
    let Time=4
    let t=0
    function READY(){
        if(Time<=0){
            console.log("HI")
            set_Timer(Time)
            SET(true)
            clearTimeout(t)
            return
        }else{
            console.log("HI")
            Time-=1
            set_Timer(Time)
            t=setTimeout(()=>{READY()},1000)
        } 
    }
  return (
    <div className='Start_Intro_Main_div'>
        <div className='Intro_Body_Main_div'>
            <button onClick={()=>{READY()}}>{Timer===4?("READY"):(Timer)}</button>
        </div>
        
    </div>
  )
}
