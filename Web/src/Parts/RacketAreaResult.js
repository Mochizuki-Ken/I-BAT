import React from 'react'
import './RacketAreaResult.css'
export default function RacketAreaResult({w,h,A,B,C}) {
  return (
    <div className='RAR_Main_div'>
        <div>
            <label>{C}</label>
        </div>
        <div className='Div2'>
            <div>
                <label>{B}</label>
            </div>
            <div className='Div3'>
                <label>{A}</label>
            </div>
        </div>
    </div>
  )
}
