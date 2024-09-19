import React,{useEffect,useState,createContext} from 'react';

// import axios from 'axios';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
//firebase
import firebase from "./API/API";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
//Pages
import Auth from './Pages/Auth';
import Home from './Pages/Home';
import StartMission from './Pages/StartMission';
import { io } from 'socket.io-client';
import axios from 'axios';
const socket=io.connect(localStorage.getItem('SOCKET_URL'))
export const Auth_context=createContext(null)
function App() {
  const [user,set_user]=useState({state:false})
  useEffect(()=>{
    axios.get(localStorage.getItem('RACKET_URL')).then(()=>{})
    if(localStorage.getItem('RACKET_URL')===null){
      localStorage.setItem('RACKET_URL','https://192.168.8.107:3001/racket')
      localStorage.setItem('SOCKET_URL','https://192.168.8.106:3002')
    }else if(JSON.parse(localStorage.getItem('USER_IDS'))!==null){
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
    if (localStorage.getItem('Visitor_name')){
      
      if(localStorage.getItem('USER_IDS')&& !JSON.parse(localStorage.getItem('USER_IDS')).includes(localStorage.getItem("Visitor_name"))){
        localStorage.removeItem("Visitor_name")
        // window.location.reload()
      }else{
        set_user({state:'visitor',name:localStorage.getItem("Visitor_name")})
      }
    }else{
      set_user({state:false})
      // firebase.auth().onAuthStateChanged((currentUser)=>{
      //   if(currentUser){
      //     set_user({state:"logined",email:currentUser.email,name:currentUser.displayName,ppc:currentUser.photoURL})
          
      //   }else{
      //     set_user({state:false})
      //   }
      // })
    }
    
  },[])
  let n=0
  useEffect(()=>{socket.on('HIT',()=>{
    if(n!==1){
      console.log('HIT')
      let audio=new Audio()
                  audio.src=require('./Media/Sound.mp3')
                  audio.volume=1
                  audio.play()
      
      let audio2=new Audio()
        audio2.src=require('./Media/ADD_SCORE.mp3')
        audio2.volume=0.3
        
      setTimeout(()=>{audio2.play()},500)
      n=1
    }else{
      n=0
    }
  })},[socket])
  return (
    // <div className='App_Main_div'>
    // </div>
    <BrowserRouter className='App_Main_div'>
      <Auth_context.Provider value={{user,set_user}}>
      {/* <audio id='HIT_AUDIO'>
          <source src={require('./Media/Sound.mp3')} />
        </audio> */}
      <Routes>
        
        
        
        {user.state!==false&&<Route element={<Home />}  path='/' />}
        {user.state!==false&&<Route element={<Home />}  path='/Home' />}
        {user.state!==false&&<Route element={<StartMission />}  path='/start_mission/:mid' />}
        {!user.state&&<Route element={<Auth />}  path='/' />}
        {<Route element={<Auth />}  path='/Auth' />}
        
      </Routes>
      </Auth_context.Provider>
    </BrowserRouter>
  );
}


export default App;
