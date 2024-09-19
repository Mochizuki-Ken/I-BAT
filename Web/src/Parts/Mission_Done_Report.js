import React,{useEffect,useState} from 'react'
import './Mission_Done_Report.css'
import { SimpleLineChart,TwoPieChart } from './CHART/Chart'
import RacketAreaResult from './RacketAreaResult'
import {BsFillCapslockFill,BsFillCaretDownFill} from 'react-icons/bs'
import Mission_btn from './Mission_btn'
import { io } from 'socket.io-client';
const socket=io.connect(localStorage.getItem('SOCKET_URL'))
export default function Mission_Done_Report({REPORT,TYPE=false}) {
  const [data,set_data]=useState(false)
  let n=0
  function upLoadReport(){
    if(REPORT.RT==='NaN')REPORT.RT=30
    let Re=JSON.parse(localStorage.getItem('RECORDS'))
    Re[localStorage.getItem('Visitor_name')].push(REPORT)
    localStorage.setItem('RECORDS',JSON.stringify(Re))

    let Pl=JSON.parse(localStorage.getItem('PLANS'))
    // Pl[localStorage.getItem('Visitor_name')].push('Position!')
    // localStorage.setItem('PLANS',JSON.stringify(Pl))

    if(localStorage.getItem('plan')==='true'){
      let ar=[]
      let n=0
      for (let i of Pl[localStorage.getItem('Visitor_name')]){
        if(i!==REPORT.MissionName || n>=1){
          ar.push(i)
        }else n+=1
      }
      Pl[localStorage.getItem('Visitor_name')]=ar
      // Pl[localStorage.getItem('Visitor_name')].splice(Pl[localStorage.getItem('Visitor_name')].indexOf(REPORT.MissionName),Pl[localStorage.getItem('Visitor_name')].indexOf(REPORT.MissionName)-1)
      console.log(Pl)
      localStorage.setItem('PLANS',JSON.stringify(Pl))
      localStorage.removeItem('plan')
    }
    let s=0
    // if(REPORT.MissionName)
    let Names=JSON.parse(localStorage.getItem('USER_IDS'))
    let Re2=JSON.parse(localStorage.getItem('RECORDS'))

    let Arr2=[]
    for (let i of Names){
      for (let i2 of Re2[i]){
        Arr2.push({name:i,score:i2.scores})
        
      }
    }
    socket.emit('New',Arr2)

    
  }
  function LoadData(){
    let ALL=[]
    let PERSONAL=[]
    let Names=JSON.parse(localStorage.getItem('USER_IDS'))
    let Re=JSON.parse(localStorage.getItem('RECORDS'))
    for (let i of Names){
      for (let i2 of Re[i]){
        if(i2.MissionName===REPORT.MissionName){
          ALL.push(i2)
          if(i===localStorage.getItem('Visitor_name')){
            PERSONAL.push(i2)
          }
        }
      }
    }
    let data={
      MissionName:REPORT.MissionName,
      Area:{ALL_AVARAGE:{A:0,B:0,C:0},PERSONAL_AVARAGE:{A:0,B:0,C:0},CURRENT_:{A:REPORT.A,B:REPORT.B,C:REPORT.C},CHANGE:0},
      Score:{ALL_AVARAGE:0,PERSONAL_AVARAGE:0,CURRENT_:REPORT.scores,CHANGE:0},
      Hit:{ALL_AVARAGE:0,PERSONAL_AVARAGE:0,CURRENT_:REPORT.HT,CURRENT_Arr:[],CHANGE:0},
      React:{ALL_AVARAGE:0,PERSONAL_AVARAGE:0,CURRENT_:REPORT.RT,CURRENT_Arr:[],CHANGE:0},
      Suggest:0
    }
    for (let i of ALL){
      data.Area.ALL_AVARAGE.A+=i.A
      data.Area.ALL_AVARAGE.B+=i.B
      data.Area.ALL_AVARAGE.C+=i.C

      data.Score.ALL_AVARAGE+=i.scores
      data.Hit.ALL_AVARAGE+=parseFloat(i.HT);
      data.React.ALL_AVARAGE+=parseFloat(i.RT);
    }
    data.Area.ALL_AVARAGE.A/=ALL.length
    data.Area.ALL_AVARAGE.B/=ALL.length
    data.Area.ALL_AVARAGE.C/=ALL.length
    data.Score.ALL_AVARAGE/=ALL.length
    data.Hit.ALL_AVARAGE/=ALL.length
    data.React.ALL_AVARAGE/=ALL.length
    for (let i of PERSONAL){
      data.Area.PERSONAL_AVARAGE.A+=i.A
      data.Area.PERSONAL_AVARAGE.B+=i.B
      data.Area.PERSONAL_AVARAGE.C+=i.C
      data.Score.PERSONAL_AVARAGE+=i.scores
      data.Hit.PERSONAL_AVARAGE+=parseFloat(i.HT);
      data.React.PERSONAL_AVARAGE+=parseFloat(i.RT);
    }
    data.Area.PERSONAL_AVARAGE.A/=PERSONAL.length
    data.Area.PERSONAL_AVARAGE.B/=PERSONAL.length
    data.Area.PERSONAL_AVARAGE.C/=PERSONAL.length
    data.Score.PERSONAL_AVARAGE/=PERSONAL.length
    data.Hit.PERSONAL_AVARAGE/=PERSONAL.length
    data.React.PERSONAL_AVARAGE/=PERSONAL.length
    if(data.Score.CURRENT_===0 && data.Score.PERSONAL_AVARAGE===0){
      data.Area.CHANGE=0
      data.Score.CHANGE=0
      data.Hit.CHANGE=0
      data.React.CHANGE=0
    }else{
      let A=data.Area.CURRENT_.A*5+data.Area.CURRENT_.B*3+data.Area.CURRENT_.C
      let B=data.Area.PERSONAL_AVARAGE.A*5+data.Area.PERSONAL_AVARAGE.B*3+data.Area.PERSONAL_AVARAGE.C
      data.Area.CHANGE=((A/B)-1)*100


      data.Score.CHANGE=((data.Score.CURRENT_/data.Score.PERSONAL_AVARAGE)-1)*100
      data.Hit.CHANGE=((data.Hit.CURRENT_/data.Hit.PERSONAL_AVARAGE)-1)*100
      data.React.CHANGE=((data.React.PERSONAL_AVARAGE/data.React.CURRENT_)-1)*100
    }
    // REPORT.HitsArr
    for (let i=0 ;i<REPORT.HitsArr.length;i++){
      data.Hit.CURRENT_Arr.push({name:`${i}`,Current:REPORT.HitsArr[i],G:data.Hit.ALL_AVARAGE,P:data.Hit.PERSONAL_AVARAGE})
    }
    for (let i=0 ;i<REPORT.ReactArr.length;i++){
      data.React.CURRENT_Arr.push({name:`${i}`,Current:REPORT.ReactArr[i],G:data.React.ALL_AVARAGE,P:data.React.PERSONAL_AVARAGE})
    }
    if(data.Score.PERSONAL_AVARAGE>=300){
      data.Suggest={name:"Ball InComing And Position!",mid:'ms09'}
    }else if(data.Score.PERSONAL_AVARAGE>=250){
      data.Suggest={name:"Ball InComing! (HARDER)",mis:'ms08'}
    }else if(data.Score.PERSONAL_AVARAGE>=180){
      data.Suggest={name:"Ball InComing! (EASY)",mid:'ms07'}
    }else{
      data.Suggest={name:"Position!",mid:'ms06'}
    }
    if(!TYPE){
      if(data.Score.PERSONAL_AVARAGE<=600){
        let Pl=JSON.parse(localStorage.getItem('PLANS'))
      Pl[localStorage.getItem('Visitor_name')].push(data.Suggest)
      localStorage.setItem('PLANS',JSON.stringify(Pl))
      }
    }
    
    

    set_data(data)
    console.log(data)
    
  }
  useEffect(()=>{
    let es=document.getElementsByClassName('canva')
    let t=setTimeout(()=>{for (let i of es){i.style.display='None'};clearTimeout(t)},4000)
    if(n!==1){
      if(!TYPE)upLoadReport()
      LoadData()

      n=1
    }
    
    
  },[])

  // const Level={}
  function Level(e){
    if(e>=500){
      return("level04.png")
    }else if(e>=360){
      return("level03.png")
    }else if(e>=300){
      return("level02.png")
    }else{
      return("level01.png")
    }
  }
  if(data!==false)return (
    <div className='Mission_Done_Report_Mian_div'>
      <label className='cc'>{TYPE===false?('FINISH'):('REPORT') }</label>
      <div className='Mission_Done_Report_div'>
        <div className='TOP_DIV'>
          <div className='div'>
            <label>{data.MissionName}</label>
          </div>
        </div>
        <div className='MIDDLE_DIV'>
          <div className='left_div Div'>
            <div className='top_div'>
              <label >TOTAL SCORES</label>
              <label className='T'>{data.Score.CURRENT_}</label>
            </div>
            <div className='middle1_div'>
              <RacketAreaResult A={data.Area.CURRENT_.A} B={data.Area.CURRENT_.B} C={data.Area.CURRENT_.C}/>
            </div>
            <div className='middle2_div'>
              <TwoPieChart ALL={[{value:Math.round(data.Area.ALL_AVARAGE.A)},{value:Math.round(data.Area.ALL_AVARAGE.B)},{value:Math.round(data.Area.ALL_AVARAGE.C)}]} PENSONAL={[{value:Math.round(data.Area.PERSONAL_AVARAGE.A)},{value:Math.round(data.Area.PERSONAL_AVARAGE.B)},{value:Math.round(data.Area.PERSONAL_AVARAGE.C)}]} THIS={[{value:Math.round(data.Area.CURRENT_.A)},{value:Math.round(data.Area.CURRENT_.B)},{value:Math.round(data.Area.CURRENT_.C)}]}/>
            </div>
            <div className='bottom_div'>
              <label className='R'>{Math.round(data.Area.CHANGE)}%{data.Area.CHANGE.toString()[0]==='-'?(<BsFillCaretDownFill className='ICON1' style={{color:'red'}}/>):(<BsFillCapslockFill className='ICON1' style={{color:'#41f06f'}}/>)}</label>
            </div>
          </div>
          <div className='middle_div Div'>
            <div className='top_div' style={{display:'flex',flexDirection:"column",justifyContent:'flex-end'}}>
              <img src={require(`./../Media/${Level(data.Score.CURRENT_)}`)} className='RANK_IMG'/>
              {REPORT.scores>data.Score.ALL_AVARAGE?(<label className='Over' style={{color:'lightgreen'}}>BETTER THAN AVARAGE</label>):(<label className='Over' style={{color:'red'}}>UNDER AVARAGE</label>)}
            </div>
            <div className='middle_div'>
              
              <div className='_div'>
                <label className='T'>PERFORMANCE RESULT</label>
                <label>Global Avarage <label>{Math.round(data.Score.ALL_AVARAGE )}</label></label>
                <label>Your Avarage <label>{Math.round(data.Score.PERSONAL_AVARAGE)}</label></label>
                <label>This Time <label>{Math.round(REPORT.scores)}</label></label>
                <label className='R'>{Math.round(data.Score.CHANGE)}%{data.Score.CHANGE.toString()[0]==='-'?(<BsFillCaretDownFill className='ICON1' style={{color:'red'}}/>):(<BsFillCapslockFill className='ICON1' style={{color:'#41f06f'}}/>)}</label>
              </div>
            </div>
            <div className='bottom_div'>
              <label className='Ms'>MISSION SUGGEST</label>
              <Mission_btn name={data.Suggest.name} Mid={data.Suggest.mid} dis={"Hit the Ball to the target Area!"} displayType={"Middle"}/>
            </div>
          </div>
          <div className='right_div Div'>
            <div className='top_div'>
              <label >HIT PerCentage </label>
              <label className='T'>{Math.round(data.Hit.CURRENT_)}%</label>
            </div>
            <div className='middle1_div'>
              <SimpleLineChart Data={data.Hit.CURRENT_Arr}/>
              <div className='re_div'>
                <label className='small'>GLOBAL</label>
                <label>{Math.round(data.Hit.ALL_AVARAGE)}%</label>
                <label className='small'>YOUR</label>
                <label>{Math.round(data.Hit.PERSONAL_AVARAGE)}%</label>
                <label className='M'>{Math.round(data.Hit.CHANGE)}%{data.Hit.CHANGE.toString()[0]==='-'?(<BsFillCaretDownFill className='ICON' style={{color:'red'}}/>):(<BsFillCapslockFill className='ICON' style={{color:'#41f06f'}}/>)}</label>
              </div>
            </div>
            <div className='middle2_div'>
              <label >REACT AVARAGE</label>
              <label className='T'>{data.React.CURRENT_}s</label>
            </div>
            <div className='bottom_div'>
              <SimpleLineChart Data={data.React.CURRENT_Arr}/>
              <div className='re_div'>
                <label className='small'>GLOBAL</label>
                <label>{Math.round(data.React.ALL_AVARAGE*100)/100}s</label>
                <label className='small'>YOUR</label>
                <label>{Math.round(data.React.PERSONAL_AVARAGE*100)/100}s</label>
                <label className='M'>{data.React.CHANGE.toString()[0]==='-'?(Math.round(data.React.CHANGE)):(Math.round(data.React.CHANGE))}%{data.React.CHANGE.toString()[0]==='-'?(<BsFillCaretDownFill className='ICON' style={{color:'red'}}/>):(<BsFillCapslockFill className='ICON' style={{color:'#41f06f'}}/>)}</label>
              </div>
            </div>
          </div>
        </div>
        <div className='TOP_DIV'>
          <div className='div2'>
            {<label onClick={()=>{if(TYPE&&TYPE.type==="record")TYPE.fun();else window.location.href='/'}}>GO MENU</label>}
          </div>
        </div>
      </div>
    </div>
  )
}
