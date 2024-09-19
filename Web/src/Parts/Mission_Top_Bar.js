import React,{useEffect} from 'react'
import './Mission_Top_Bar.css'
export default function Mission_Top_Bar({REPORT,TYPE}) {
  useEffect(()=>{
    
  },[REPORT])
  if(TYPE==='1')return (
    <div className='Mission_Top_Bar_Main_div'>
        {/* <div className='left'>
          <div className='top'> */}
            
          {/* </div> */}
          {/* <div className='bottom'>
            <label >區域A: {REPORT.A}</label>
            <label > 區域B: {REPORT.B}</label>
            <label > 區域C: {REPORT.C}</label>
          </div> */}
        {/* // </div> */}
        {/* 分數: 平均反應時間: 擊中率: */}
        <div className='DIV'>
        <label className='o1' id='Score'>{REPORT.scores==='NaN'?(0):(REPORT.scores)}</label>
        <label className='o'>{REPORT.HT==='NaN'?(0):(REPORT.HT)}%</label>
        <label className='o'> {REPORT.RT==='NaN'?(0):(REPORT.RT)}s</label>

        <label className='o2'>00:{Math.round(REPORT.Timer)}</label>
        </div>

    </div>
  )
}
