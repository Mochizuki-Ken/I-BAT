import axios from 'axios';
import { drawKeypoints,drawSkeleton } from '../test/utilities';
class Tools{
    SERVER=localStorage.getItem('RACKET_URL')
    SOCKET_SERVER=localStorage.getItem('SOCKET_URL')
    stream=false
    #KEEP=true
    canvaSize={w:500,h:300}
    // screenSize={w:530,h:400}
    screenSize={w:window.innerWidth,h:window.innerHeight}
    constructor(){

    }
    
    IsRacketInsideDetact(pos,target,type){
      if (type==='ball'){
        if ((((pos.x1>=target.x1)&&(pos.y1>=target.y1))&&
        ((pos.x2<=target.x2)&&(pos.y2<=target.y2)))){
          if(target.x2-target.x1<=500&&target.y2-target.y1<=500){
            console.log('true',pos,target)
            return true
          }else{
            console.log('false')
            return false
          }
        }else{
          console.log('false')
          return false
        }
      }else{
        if ((pos.x1>=target.x1)&&(pos.y1>=target.y1)&&
        (pos.x2<=target.x2)&&(pos.y2<=target.y2)){
          console.log('true')
          return true
        }else{
          console.log('false')
          return false
        }
      }
      
    }
    // async Detect(net){
    //   const canvas=document.getElementById('canvaShow')//canvaShow
    //   const pose=await net.estimateSinglePose(canvas)
    //   const canva=document.getElementById('canva3')
    //   const ctx=canva.getContext('2d')
    //   ctx.clearRect(0, 0, this.screenSize.width, this.screenSize.height);
    //   console.log(pose);
    //   this.drawCanvas(pose);
    //   return(pose['keypoints'])
    // }
    // drawCanvas = (pose) => {
    //   const canva=document.getElementById('canva3')
    //   const ctx=canva.getContext('2d')
    //   drawKeypoints(pose["keypoints"], 0.6, ctx);
    //   drawSkeleton(pose["keypoints"], 0.6, ctx);
    // };
    async GET_DATA(stream1){
        var result='NONE'
        if (stream1){
          let response=await axios.post(this.SERVER,{data:stream1})
          if (response.data.data!=="NONE"){
              let data=response.data.data
              let xyxy={x1:data[0][0],y1:data[0][1],x2:data[1][0],y2:data[1][1]}
              xyxy.x1=xyxy.x1*(this.screenSize.w/this.canvaSize.w)
              xyxy.x2=xyxy.x2*(this.screenSize.w/this.canvaSize.w)
              xyxy.y1=xyxy.y1*(this.screenSize.h/this.canvaSize.h)
              xyxy.y2=xyxy.y2*(this.screenSize.h/this.canvaSize.h)
              let rectSize={w:0,h:0}
              rectSize.w=xyxy.x2-xyxy.x1
              rectSize.h=xyxy.y2-xyxy.y1
            //   console.log(xyxy)
      
              // let canva=document.getElementById('canva1')
              // let ctx=canva.getContext('2d')
              // ctx.lineWidth = "4";
              // ctx.strokeStyle = "skyblue";
              // // ctx.clearRect(0, 0, this.screenSize.width, this.screenSize.height);
              // ctx.clearRect(0, 0, canva.width, canva.height);
              // ctx.beginPath();
              // ctx.rect(xyxy.x1,xyxy.y1,rectSize.w,rectSize.h);
              // ctx.stroke();
              return(xyxy)
            }else{
              let canva=document.getElementById('canva1')
              let ctx=canva.getContext('2d')
              // ctx.clearRect(0, 0, this.screenSize.width, this.screenSize.height);
              ctx.clearRect(0, 0, canva.width, canva.height);
              result='NONE'
              return(result)
            }
            
            

          
          
        }
        
    }


}
export default new Tools()


// function GET_DATA(){
//   if (stream1){axios.post('https://192.168.0.112:3001/racket',{data:stream1}).then((response)=>{
//       console.log(response.data) ;  
//       // setV(response.data.data)
//       if (response.data.data!=="NONE"){
//         let data=response.data.data
//         let xyxy={x1:data[0][0],y1:data[0][1],x2:data[1][0],y2:data[1][1]}
//         // for (let i=0;i<=1;i++){
//         //   for (let i2=0;i2<=1;i2++){
//         //     data[i][i2]=data[i][i2]*1.2
//         //   }
//         // }
//         xyxy.x1=xyxy.x1*(screenSize.w/canvaSize.w)
//         xyxy.x2=xyxy.x2*(screenSize.w/canvaSize.w)
//         xyxy.y1=xyxy.y1*(screenSize.h/canvaSize.h)
//         xyxy.y2=xyxy.y2*(screenSize.h/canvaSize.h)
//         let rectSize={w:0,h:0}
//         rectSize.w=xyxy.x2-xyxy.x1
//         rectSize.h=xyxy.y2-xyxy.y1
//         console.log(xyxy)

//         let canva=document.getElementById('canva')
//         let ctx=canva.getContext('2d')
//         ctx.lineWidth = "4";
//         ctx.strokeStyle = "skyblue";
//         ctx.clearRect(0, 0, canva.width, canva.height);
//         ctx.beginPath();
//         ctx.rect(xyxy.x1,xyxy.y1,rectSize.w,rectSize.h);
//         ctx.stroke();
//         set_processed_data(data)


//       }else{
//         let canva=document.getElementById('canva')
//         let ctx=canva.getContext('2d')
        
//         ctx.clearRect(0, 0, canva.width, canva.height);
//       }
//     })}
//   }




// const detect = async (net,v) => {
//   const canvas=document.getElementById('canvaShow')
//   const pose=await net.estimateSinglePose(canvas)
//   const canva=document.getElementById('canva2')
//   const ctx=canva.getContext('2d')
//   ctx.clearRect(0, 0, canva.width, canva.height);
//   console.log(pose);
//   drawCanvas(pose);
    
    
    
// };
// const drawCanvas = (pose) => {
//   const canva=document.getElementById('canva2')
//   const ctx=canva.getContext('2d')
//   drawKeypoints(pose["keypoints"], 0.6, ctx);
//   drawSkeleton(pose["keypoints"], 0.6, ctx);
  

// };