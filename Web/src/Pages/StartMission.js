import React,{useState,useEffect,useContext} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios';
// import * as tf from "@tensorflow/tfjs";
// import * as posenet from "@tensorflow-models/posenet";
import tools from '../tools/tools';
import './StartMission.css'
import Mission_Top_Bar from '../Parts/Mission_Top_Bar';
import Mission_Start_Intro from '../Parts/Mission_Start_Intro';
import Mission_Done_Report from '../Parts/Mission_Done_Report';
// import { drawKeypoints,drawSkeleton } from '../test/utilities';
import { BallIncoming_ } from '../tools/MISSON';
export default function StartMission() {
  const { mid } = useParams();
  const navigate=useNavigate()
  
  let stream1=false
  const [stream_data,Set_stream]=useState(null)
  let canvaSize={w:500,h:300}
  // let screenSize={w:530,h:400}
  let screenSize={w:window.innerWidth,h:window.innerHeight}
  // const runPosenet = async () => {
  //   const net = await posenet.load({
  //     inputResolution: { width:screenSize.w, height: screenSize.h },
  //     scale: 0.8,
  //   });
  //   async function loop(){
  //     let poseKeyPoint=await tools.Detect(net)
  //     console.log(poseKeyPoint)
  //     // detect(net)
  //     setTimeout(()=>{loop()},180)
  //   }
  //   loop()
  // };
  const handleVideoStream = () => {
    const canvas=document.createElement('canvas')
    const canvaShow=document.getElementById('canvaShow')
    let ctx2=canvaShow.getContext('2d')
    canvas.width=canvaSize.w
    canvas.height=canvaSize.h
    const ctx=canvas.getContext('2d')
    const videoElement = document.createElement('video');
    videoElement.id='video_source'
    navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.mediaDevices.getUserMedia);
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      
      videoElement.srcObject = stream;
      videoElement.play();
      function cap(){
        if(BallIncoming_.Timer_S<=0){stream.getTracks().forEach(function(track) {
          track.stop();
        });}
          ctx.drawImage(videoElement,0,0,canvas.width,canvas.height)
          let  jpg=canvas.toDataURL('image/jpeg')
          stream1=jpg
          setTimeout(()=>{Set_stream(jpg)},200)
          requestAnimationFrame(cap)
      }
      cap()
      function cap2(){
        setTimeout(()=>{
          ctx2.drawImage(videoElement,0,0,canvaShow.width,canvaShow.height)
          requestAnimationFrame(cap2)
        },100)
        
      }
      cap2()
    })
};
  const [Mission_Done,set_Mission_Done]=useState(false)
  const [start,setStart]=useState(false)
  const [timer,SetTimer]=useState(30)
  var t=0
  let n=0
  let z=0
  let tttt=0
  function TS(){
    if(BallIncoming_.Timer_S<=0){
      clearTimeout(n)
      return}
    BallIncoming_.Timer_S-=0.1
    SetTimer(BallIncoming_.Timer_S)
    n=setTimeout(()=>{TS()},100)
  }
  function MissionDone(){
    set_Mission_Done(true)
    // UpdateReport()
  }
  function UpdateReport(){
    let REACTTIME_AVARGE=0
      for(let i of BallIncoming_.REPORT.ReactTimes){
        REACTTIME_AVARGE+=i
      }
      REACTTIME_AVARGE/=BallIncoming_.REPORT.ReactTimes.length
      REACTTIME_AVARGE=REACTTIME_AVARGE.toString().substring(0,4)
      let HITED_AVA=((BallIncoming_.REPORT.AreaA+BallIncoming_.REPORT.AreaB+BallIncoming_.REPORT.AreaC)/BallIncoming_.Second_Balled)*100
      if(HITED_AVA>100 ){
        HITED_AVA='...'
      }else BallIncoming_.REPORT.HitsArr.push(HITED_AVA)
      if(HITED_AVA.toString().length>=3){
        HITED_AVA= HITED_AVA.toString().substring(0,4)
      }
      SetReport({scores:Report.scores+ BallIncoming_.REPORT.score,
      A:BallIncoming_.REPORT.AreaA,B:BallIncoming_.REPORT.AreaB,C:BallIncoming_.REPORT.AreaC,
      RT:REACTTIME_AVARGE,HT:HITED_AVA,ReactArr:BallIncoming_.REPORT.ReactTimes,HitsArr:BallIncoming_.REPORT.HitsArr,BallCount:BallIncoming_.Second_Balled
      })
  }
  async function time_loop(ms){
    // GET_DATA();
    if(tttt==="BREAK"){
      clearTimeout(z)
        return
    }
    let response =await tools.GET_DATA(stream1)

    console.log('res',response)
    BallIncoming_.SET_RACKET_POS(response)

    // if(t===1||start===true){
    //   console.log('res2')
    //   if(n===0 ){setTimeout(TS,100);n=1}
    //   let loop=BallIncoming_.Mission_Loop()
    //   if(loop==="BREAK"){
    //     clearTimeout(z)
    //     MissionDone()
    //     return
    //   }else if(loop==="add"){
    //     UpdateReport()
    //   }
    // }
    z=setTimeout(time_loop,ms)
  }
  async function time_loop2(ms){
    if(t===1||start===true){
      console.log('res2')
      if(n===0 ){setTimeout(TS,100);n=1}
      let loop=BallIncoming_.Mission_Loop()
      if(loop==="BREAK"){
        clearTimeout(z)
        MissionDone()
        tttt='BREAK'
        return
      }else if(loop==="add"){
        UpdateReport()
      }
    }
    z=setTimeout(()=>{time_loop2(ms)},ms)
  }
  const [Report,SetReport]=useState({scores:0,A:0,B:0,C:0,RT:0,HT:0})
  useEffect( ()=>{
    if((mid!=="Position!")&&(mid!=="Ball InComing! (EASY)")&&(mid!=="Ball InComing! (HARDER)")&&(mid!=="Ball InComing And Position!")){
      setTimeout(()=>{navigate('/')},3000) 
    }else{
      handleVideoStream();
      if (mid==="Position!"){
        // runPosenet()
        BallIncoming_.Mission_counter=1
        if(start){
          time_loop(150) 
          time_loop2(50)
        }
      }else if (mid==="Ball InComing! (EASY)"){
        BallIncoming_.Mission_counter=2
        BallIncoming_.Second_Level='EASY'
        if(start){
          time_loop(150) 
          time_loop2(80)
        }
      }else if (mid==="Ball InComing! (HARDER)"){
        BallIncoming_.Mission_counter=2
        BallIncoming_.Second_Level='MEDIUM'
        if(start){
          time_loop(150) 
          time_loop2(60)
        }
      }else if (mid==="Ball InComing And Position!"){
        BallIncoming_.Mission_counter=2
        BallIncoming_.Second_Level='HARD'
        if(start){
          time_loop(150) 
          time_loop2(70)
        }
      }
    }
  },[start])
  if((mid==="Position!")||(mid==="Ball InComing! (EASY)")||(mid==="Ball InComing! (HARDER)")||(mid==="Ball InComing And Position!")){
    return (
    <div>
      <img style={{display:'none'}} id='img_left' width={'60px'} height={'60px'} src={require('./../Media/ball_left.png')}/>
      <img style={{display:'none'}} id='img_right' width={'60px'} height={'60px'} src={require('./../Media/ball_right.png')}/>
      <img style={{display:'none'}} id='img_UP_left' width={'60px'} height={'60px'} src={require('./../Media/ball_UP_left.png')}/>
      <img style={{display:'none'}} id='img_UP_right' width={'60px'} height={'60px'} src={require('./../Media/ball_UP_right.png')}/>
      <img style={{display:'none'}} id='SMALL' width={'60px'} height={'60px'} src={require('./../Media/SMALL.png')}/>
      <div className='StartMission_Main_div'>
      
      <Mission_Top_Bar REPORT={{...Report,Timer:timer}} TYPE={'1'}/>
      {!start&&<Mission_Start_Intro MID={mid} SET={setStart} />}
      {Mission_Done&&<Mission_Done_Report REPORT={{...Report,MissionName:mid}}/>}
        <canvas  id="canvaShow" className='canva' width={screenSize.w} height={screenSize.h} style={
          {
            position:'absolute',
            left:'0',
            top:'0'
          }
        }/>
        <canvas id="canva1" width={screenSize.w} className='canva' height={screenSize.h} style={
          {
            position:'absolute',
            left:'0',
            top:'0'
            // left:'22%',
            // top:'28%',
            // opacity:'0.5'
          }
        }/>
        <canvas id="canva2" width={screenSize.w} className='canva' height={screenSize.h} style={
          {
            position:'absolute',
            left:'0',
            top:'0',
            // left:'22%',
            // top:'28%',
            opacity:'0.5'
          }
        }/>
        <canvas id="canva3" width={screenSize.w} className='canva' height={screenSize.h} style={
          {
            position:'absolute',
            left:'0',
            top:'0'
            // left:'22%',
            // top:'28%'
          }
        }/>
        </div>
      </div>
    
    )
  }else{
    return(
      <label style={{}}>MISSION IS NOT AVAILABLE</label>
    )
  }
}
