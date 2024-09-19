import React,{useState,useEffect,useContext} from 'react'
import './Record.css'
import Missions_data from '../../../FakeData.js/Missions_data'
import Mission_btn from '../../../Parts/Mission_btn'
import Mission_Done_Report from '../../../Parts/Mission_Done_Report'
export default function Record() {
  const [datas,set_datas]=useState(false)
  const [data,set_data]=useState({state:false,data:false})
  function FIND_FROM_MISSION(e){
    let found=false
    for(let i of Missions_data.Missions){
      if (e===i.MissionName){
        found=i
      }
    }
    return(found)
  }
  useEffect(()=>{
    
    let data=[]
    let Re=JSON.parse(localStorage.getItem('RECORDS'))
    Re=Re[localStorage.getItem('Visitor_name')]
    Re.forEach(element => {
      data.push({...FIND_FROM_MISSION(element.MissionName),report:element}) 
    });
    console.log(data)
    set_datas(data)
  },[])
  return (
    <div className='Record_Main_div'>
      {data.state===false&&<div className='Record_Scroll_div'>
      {/* <Mission_btn displayType={"Large"} name={'a'} dis={'a'}/>  */}
        {datas&&datas.map((element)=>{

          return(
            <Mission_btn displayType={"DoneL"} Mid={element.MissionId} onClick={()=>{set_data({state:true,data:element.report})}} name={element.MissionName} dis={element.MissionInfo}/> 
          )
        })}
      </div>}
      {data&&data.data&&<Mission_Done_Report REPORT={data.data} TYPE={{type:'record',fun:()=>{set_data({state:false,data:false})}}}/>}
    </div>
  )
}
