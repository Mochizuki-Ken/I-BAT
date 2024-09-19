import React,{useState,useEffect,useContext}from 'react'
import './Auth.css'
import { useNavigate } from 'react-router-dom';
import { Auth_context } from '../App';
//firebase
import firebase from "../API/API";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
export default function Auth() {
  const {user,set_user}=useContext(Auth_context)
  const moveTo=useNavigate()
  function google(){
    const google_provider=new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(google_provider).then(()=>{moveTo('/Home')})
  }
  function Visitor(){
    if(localStorage.getItem('USER_IDS')&&JSON.parse(localStorage.getItem('USER_IDS')).includes(visitor.name))return false
    
    localStorage.removeItem('Visitor_name')
    localStorage.setItem('Visitor_name',visitor.name)
    if(localStorage.getItem('USER_IDS')===null){
      localStorage.setItem('USER_IDS',JSON.stringify([visitor.name]))
      let d={}
      d[visitor.name]=[]
      localStorage.setItem('RECORDS',JSON.stringify(d))
      d[visitor.name]=[]
      localStorage.setItem('PLANS',JSON.stringify(d))
    }else{
      let new_arr=JSON.parse(localStorage.getItem('USER_IDS'))
      new_arr.push(visitor.name)
      localStorage.setItem('USER_IDS',JSON.stringify(new_arr))

      let Re=JSON.parse(localStorage.getItem('RECORDS'))
      Re[visitor.name]=[]
      localStorage.setItem('RECORDS',JSON.stringify(Re))

      let Pl=JSON.parse(localStorage.getItem('PLANS'))
      Pl[visitor.name]=[]
      localStorage.setItem('PLANS',JSON.stringify(Pl))
    }
    set_user({state:"visitor",name:visitor.name});
    moveTo('/')
  }
  // moveTo('/')
  useEffect(()=>{
    if (user.state==="visitor"){
      moveTo('/')
    }
  },[])
  
  const [visitor,set_visitor]=useState({state:false,name:null})
  return (
    <div className='Auth_Main_div'>
      <video src={require('../Media/background.mp4')} autoPlay onClick={(e)=>{e.target.play()}} loop={true}></video>
      
      
      <div className='Div'>
      
     
        <label className='I-BAT'>I BAT</label>
        <button className='SignUP' onClick={()=>{google()}} >START YOUR TRAINING</button>
        <button className='Login' onClick={()=>{google()}}>CONTINUE YOUR TRAINING</button>

        
        
      </div>
      
      <button className='Visitor_btn' onClick={()=>{set_visitor({state:true,name:null})}}>VISITOR</button>

      {visitor.state&&
      <div className='visitor_input_div'>
        <label className='I-BAT'>I BAT</label>
        <input placeholder='VISITOR NAME:' value={visitor.name} type='text'  onChange={(e)=>{set_visitor({state:visitor.state,name:e.target.value})}}></input>
        <div className='div'>
          <button onClick={()=>{set_visitor({state:false,name:null})}}>CANCEL</button>
          <button onClick={()=>{if(Visitor()===false){alert("USERNAME REPEAT");set_visitor({state:true,name:''})}}}>LOGIN</button>
        </div>
      </div>}
      <img src={require('../Media/Logo.png')} className='logo' />
    </div>
  )
}
