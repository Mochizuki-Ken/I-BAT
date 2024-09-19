import React,{useState,useEffect} from 'react'
import './Setting.css'
export default function Setting() {
    const [data,set_data]=useState(false)
    useEffect(()=>{
        try{
            let PERSONAL=JSON.parse(localStorage.getItem('USER_IDS'))
            if(PERSONAL!==null){
                set_data(PERSONAL)
            }
        }catch(e){}
        
    },[])
    function RemoveUser(user){
        let PERSONAL=JSON.parse(localStorage.getItem('USER_IDS'))
        let P_ARR=[]
        for (let i of PERSONAL){
            if (i!==user){
                P_ARR.push(i)
            }
        }
        localStorage.setItem('USER_IDS',JSON.stringify(P_ARR))

        let RECORDS=JSON.parse(localStorage.getItem('RECORDS'))
        delete RECORDS[user]
        localStorage.setItem('RECORDS',JSON.stringify(RECORDS))
        let PLANS=JSON.parse(localStorage.getItem('PLANS'))
        delete PLANS[user]
        localStorage.setItem('PLANS',JSON.stringify(PLANS))
        if(user===localStorage.getItem('Visitor_name')){
            localStorage.removeItem('Visitor_name')
            window.location.reload()
        }
        let PERSONAL2=JSON.parse(localStorage.getItem('USER_IDS'))
        if(PERSONAL2!==null){
            set_data(PERSONAL2)
        }
    }
    const [url,setUrl]=useState({R:'',S:''})
  return (
    <div className='Setting_main_div'>
        <div className='Scroll_div'>
            {data&&data.map((e)=>{
                return(
                    <div className='Each_name_div' onClick={()=>{RemoveUser(e)}}>
                        <label>{e}</label>
                    </div>
                )
            })}
        </div>
        <input width={'40%'} onChange={(e)=>{setUrl({...url,R:e.target.value})}} placeholder={localStorage.getItem('RACKET_URL')} value={url.R}></input>
        <button onClick={()=>{localStorage.setItem("RACKET_URL",url.R)}}>SET RACKET URL</button>
        <input width={'40%'} onChange={(e)=>{setUrl({...url,S:e.target.value})}} placeholder={localStorage.getItem('SOCKET_URL')} value={url.S}></input>
        <button onClick={()=>{localStorage.setItem("SOCKET_URL",url.S)}}>SET SOCKET URL</button>
        <button onClick={()=>{localStorage.removeItem('PLANS');localStorage.removeItem('RECORDS');localStorage.removeItem('USER_IDS');localStorage.removeItem('Visitor_name');window.location.reload()}}>DELETE ALL</button>
    </div>
  )
}
