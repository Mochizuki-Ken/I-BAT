import React,{useState,useEffect,useContext}from 'react'
import './Home.css'
import { Auth_context } from '../App';
//firebase
import firebase from "../API/API";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
//React Icon
import {BsPersonVcard} from 'react-icons/bs'
import {HiOutlineClipboardDocumentList} from 'react-icons/hi2'
import {GrAppsRounded} from 'react-icons/gr'
//page
import Main from './Page/Main';
import Trains from './Page/Trains';
import RecordAndPlans from './Page/RecordAndPlans';
export default function Home() {
  const {user,set_user}=useContext(Auth_context)
  function LogOut(){
    if (user.state==="visitor"){
      localStorage.removeItem("Visitor_name")
      set_user({state:false})
    }else if(user.state==="logined"){
      firebase.auth().signOut()
      firebase.auth().onAuthStateChanged((currentUser)=>{
        if(currentUser){
          set_user({state:"logined",email:currentUser.email,name:currentUser.displayName,ppc:currentUser.photoURL})
          
        }else{
          set_user({state:false})
        }
      })
    }
  }

  const [state,set_state]=useState('main')
  return (
    <div className='Home_Main_div'>
      <div className='Content_div'>
        {state==="mission"&&<Trains/>}
        {state==="main"&&<Main/>}
        {state==="record/plan"&&<RecordAndPlans/>}
      </div>
      <div className='NavBar_div'>
        <div className='Div'>
          {state==="mission"?(<GrAppsRounded style={{borderBottom:"1px"}} onClick={()=>{set_state("mission")}} className='icon'/>):
          (<GrAppsRounded  onClick={()=>{set_state("mission")}} className='icon'/>)}
          {<BsPersonVcard onClick={()=>{set_state("main")}} className='icon'/>}
          {<HiOutlineClipboardDocumentList onClick={()=>{set_state("record/plan")}} className='icon'/>}
          
        </div>
      </div>
    </div>
  )
}
