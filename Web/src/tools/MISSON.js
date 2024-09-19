import tools from "./tools"
import { io } from 'socket.io-client';
const socket=io.connect(localStorage.getItem('SOCKET_URL'))
class BallIncoming{
    constructor (t=10){
        this.t=t
    }
    Timer_S=30
    LOOP_COUNTER=0
    PRE_RACKET_POS=["NONE","NONE","NONE"]
    RACKET_POS='NONE'
    PRE_NONE=false
    Add_Score(){
        let score = document.getElementById('Score')
        let o1=score.className==="o1"
        if(o1){score.classList.remove('o1');score.classList.add('o11')}
        else{score.classList.remove('o11');score.classList.add('o1')}
    }
    SET_RACKET_POS(pos){
        if (this.Second_Mission_State!==1){
            this.RACKET_POS=pos
            if(pos!=='NONE'||this.LOOP_COUNTER-this.PRE_NONE>=12){
                this.PRE_RACKET_POS.shift()
                this.PRE_RACKET_POS.push(pos)
            }
            if(pos==="NONE"){
                this.PRE_NONE=this.LOOP_COUNTER
            }
        }   
        // if (this.PRE_RACKET_POS!==undefined && this.PRE_RACKET_POS!=="NONE"
        // &&this.RACKET_POS!==undefined && this.RACKET_POS!=="NONE"){
        //     this.RACKET_POS_M.x=(this.RACKET_POS.x1-this.PRE_RACKET_POS.x1)/this.PRE_RACKET_POS.x1
        //     this.RACKET_POS_M.y=(this.RACKET_POS.y1-this.PRE_RACKET_POS.y1)/this.PRE_RACKET_POS.y1
        // }

        console.log('pos',this.Timer_S)
        return(pos)
    }
    // screenSize={w:530,h:400}
    screenSize={w:window.innerWidth,h:window.innerHeight}
    DONE=false
    Mission_counter=2
    TOTAL_SCORES=0
    REPORT={score:0,Hited:0,HitsArr:[],ReactTimes:[],AreaA:0,AreaB:0,AreaC:0}
    NEXT_ADD=5
    First_Mission_Pos_Arr={
        a0:{x1:0,y1:0,x2:this.screenSize.w/3,y2:this.screenSize.h/3},
        a1:{x1:this.screenSize.w/3,y1:0,x2:((this.screenSize.w/3)*2),y2:this.screenSize.h/3},
        a2:{x1:((this.screenSize.w/3)*2),y1:0,x2:this.screenSize.w,y2:this.screenSize.h/3},
        b0:{x1:0,y1:this.screenSize.h/3,x2:this.screenSize.w/3,y2:((this.screenSize.h/3)*2)},
        b1:{x1:this.screenSize.w/3,y1:this.screenSize.h/3,x2:((this.screenSize.w/3)*2),y2:((this.screenSize.h/3)*2)},
        b2:{x1:((this.screenSize.w/3)*2),y1:((this.screenSize.h/3)),x2:this.screenSize.w,y2:((this.screenSize.h/3)*2)},
        c0:{x1:0,y1:((this.screenSize.h/3)*2),x2:this.screenSize.w/3,y2:this.screenSize.h},
        c1:{x1:this.screenSize.w/3,y1:((this.screenSize.h/3)*2),x2:((this.screenSize.w/3)*2),y2:this.screenSize.h},
        c2:{x1:((this.screenSize.w/3)*2),y1:((this.screenSize.h/3)*2),x2:this.screenSize.w,y2:this.screenSize.h},
        top:{x1:this.screenSize.w/10,y1:this.screenSize.h/5.5,x2:((this.screenSize.w/5)*2),y2:((this.screenSize.h/3)*2)},
        topLeft:{x1:this.screenSize.w/3,y1:this.screenSize.h/4,x2:((this.screenSize.w/3)*2),y2:((this.screenSize.h/2.5)*2)},
        topRight:{x1:this.screenSize.w/2.5,y1:this.screenSize.h/4,x2:((this.screenSize.w/2.5)*2),y2:((this.screenSize.h/2.5)*2)},
        middleLeft:{x1:this.screenSize.w/3,y1:this.screenSize.h/5.5,x2:((this.screenSize.w/3)*2),y2:((this.screenSize.h/3)*2)},
        middleRight:{x1:this.screenSize.w/3,y1:this.screenSize.h/5.5,x2:((this.screenSize.w/3)*2),y2:((this.screenSize.h/3)*2)},
    }
    First_Mission_List=['a1','top','c1','middleRight','a0','middleLeft','topRight','c0','top','c1','c2','middleLeft','c1','b1','middleRight','c1','b1','middleLeft','topRight','c0','top','c1','c2','middleLeft','c1','c2','topRight','c0','top','c1','c2','middleLeft','c1','c2','middleLeft','topRight','c1','c2','c1','c2','middleLeft','topRight','c0','top','c1','c2','middleLeft',]
    Current_First_Mission_State=0
    First_Mission_Timeout_State=0
    First_Mission_State=0
    First_Mission_Each_Time_State=0
    First_Mission_Timer=null

    First_Set_Time=false
    Time_Limit=3000
    // Next_Section=false
    First_Mission(){
        const canva=document.getElementById('canva2')
        const ctx=canva.getContext('2d')

        console.log('Mission',this.Mission_counter,'First_state',this.First_Mission_State)
        if ((this.Timer_S<=0)&&this.First_Mission_Each_Time_State==0){
            this.Mission_counter="DONE"
            ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
            
            return true
        }
        let rect=this.First_Mission_Pos_Arr[this.First_Mission_List[this.First_Mission_State]]
        if (this.First_Mission_Timeout_State==0&&this.First_Mission_Each_Time_State==0 && this.Timer_S>=0){
            this.First_Set_Time=this.Timer_S
            this.First_Mission_Each_Time_State=0
            ctx.clearRect(0, 0,  this.screenSize.w, this.screenSize.h);
            ctx.beginPath();
            ctx.strokeStyle = "#b5f5ff";
            ctx.rect(rect.x1,rect.y1,rect.x2-rect.x1,rect.y2-rect.y1);
            ctx.fillStyle = "#b5f5ff";
            ctx.fill();
            ctx.stroke();
            this.Second_Balled+=1
            
            this.First_Mission_Timeout_State=1
            this.First_Mission_Timer=setTimeout(()=>{
                this.Current_First_Mission_State=this.First_Mission_State
                if (this.Current_First_Mission_State===this.First_Mission_State){
                    this.First_Mission_Each_Time_State=1
                    let t=setTimeout(()=>{this.First_Mission_Each_Time_State=0;clearTimeout(t)},500)
                    ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
                    ctx.beginPath();
                    ctx.strokeStyle = "#ffbfb5";
                    ctx.rect(rect.x1,rect.y1,rect.x2-rect.x1,rect.y2-rect.y1);
                    ctx.fillStyle = "#ffbfb5";
                    ctx.fill();
                    ctx.stroke();
                    this.First_Mission_State+=1
                    this.First_Mission_Timeout_State=0
                    return('add')
                }
                this.First_Mission_Timeout_State=0
                clearTimeout(this.First_Mission_Timer)
            },this.Time_Limit)
        }
        if(this.RACKET_POS!='NONE'&&this.RACKET_POS!=undefined&&this.First_Mission_Each_Time_State==0&&this.Timer_S>=0&& tools.IsRacketInsideDetact(this.RACKET_POS,rect)===true){
            this.REPORT.ReactTimes.push(Math.round((this.First_Set_Time-this.Timer_S)*1000)/1000)
            this.First_Mission_Each_Time_State=1
            let t=setTimeout(()=>{this.First_Mission_Each_Time_State=0;clearTimeout(t)},500)
            ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
            ctx.beginPath();
            ctx.strokeStyle = "#b8ffb3";
            ctx.rect(rect.x1,rect.y1,rect.x2-rect.x1,rect.y2-rect.y1);
            ctx.fillStyle = "#b8ffb3";
            ctx.fill();
            ctx.stroke();
            this.REPORT.AreaB+=1
            this.REPORT.AreaC=0
            this.REPORT.AreaA=0
            this.First_Mission_State+=1
            this.First_Mission_Timeout_State=0
            this.REPORT.score+=this.NEXT_ADD
            this.NEXT_ADD+=5
            if (this.Time_Limit>=1200)this.Time_Limit-=200
            clearTimeout(this.First_Mission_Timer)
            this.Add_Score()
            return('add')
        }  
    }
    Second_Target_Area={
        a0:{x1:0,y1:0,x2:176,y2:20},
        a1:{x1:176,y1:0,x2:352,y2:20},
        a2:{x1:352,y1:0,x2:530,y2:20}
    }
    Second_Rect_Arr={
        top:{x1:this.screenSize.w/10,y1:this.screenSize.h/5.5,x2:((this.screenSize.w/5)*2),y2:((this.screenSize.h/3)*2)},
        topLeft:{x1:this.screenSize.w/3,y1:this.screenSize.h/4,x2:((this.screenSize.w/3)*2),y2:((this.screenSize.h/2.5)*2)},
        topRight:{x1:this.screenSize.w/2.5,y1:this.screenSize.h/4,x2:((this.screenSize.w/2.5)*2),y2:((this.screenSize.h/2.5)*2)},
        middleLeft:{x1:this.screenSize.w/3,y1:this.screenSize.h/5.5,x2:((this.screenSize.w/3)*2),y2:((this.screenSize.h/3)*2)},
        middleRight:{x1:this.screenSize.w/3,y1:this.screenSize.h/5.5,x2:((this.screenSize.w/3)*2),y2:((this.screenSize.h/3)*2)},
    }
    Second_Mission_List=["a1",'a0','a1','a2','a0','a1']
    Second_Ball_current_position={x1:0,y1:0,x2:20,y2:20}
    Second_Ball_amount=20
    Second_Balled=0
    Second_Mission_State=0
    Second_Ball_Coming_State=0
    Second_Hited_state=0
    SC=0
    Second_Ball_Time={Start:false}
    Second_Level='MEDIUM'
    Second_HARD_Block_Area=null
    BALL_SMALLER(){
        this.Second_Ball_current_position.x1+=0.5
        this.Second_Ball_current_position.y1+=0.5
        this.Second_Ball_current_position.x2-=0.5
        this.Second_Ball_current_position.y2-=0.5
    }
    Second_Loop(){
        const canva=document.getElementById('canva3')
        canva.style.opacity='1'
        const ctx=canva.getContext('2d')
        const canva2=document.getElementById('canva2')
        canva2.style.opacity='0.5'
        const ctx2=canva2.getContext('2d')
        console.log('Total',this.REPORT.AreaA+this.REPORT.AreaB+this.REPORT.AreaC,'ball',this.Second_Balled)
        if (this.Timer_S<=0){
            this.Mission_counter="DONE"
            ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
            ctx2.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
            // ctx.clearRect(0, 0, 530, 400);
            // ctx2.clearRect(0, 0, 530, 400);
            return true
        }
        if (this.Second_Mission_State===0){
            if(this.Second_Ball_Coming_State===0){
                this.Second_Balled+=1
                this.Second_Ball_Time.Start=this.Timer_S
                this.Second_Hited_state=0
                let random=Math.random()
                if(random>=0.8){this.Second_Ball_Coming_State="top";this.Second_Ball_current_position={x1:this.screenSize.w/1.5,y1:-30,x2:(this.screenSize.w/1.5)+20,y2:-10};this.Second_HARD_Block_Area=this.Second_Rect_Arr.top}
                else if(random>=0.6){this.Second_Ball_Coming_State="top-left";this.Second_Ball_current_position={x1:-30,y1:this.screenSize.h/8,x2:-10,y2:(this.screenSize.h/8)+20};this.Second_HARD_Block_Area=this.Second_Rect_Arr.topLeft}
                else if(random>=0.4){this.Second_Ball_Coming_State="middle-left";this.Second_Ball_current_position={x1:-30,y1:(this.screenSize.h/3)*2,x2:-10,y2:((this.screenSize.h/3)*2)+20};this.Second_HARD_Block_Area=this.Second_Rect_Arr.middleLeft}
                else if(random>=0.2){this.Second_Ball_Coming_State="top-right";this.Second_Ball_current_position={x1:this.screenSize.w+10,y1:this.screenSize.h/8,x2:this.screenSize.w+30,y2:(this.screenSize.h/8)+20};this.Second_HARD_Block_Area=this.Second_Rect_Arr.topRight}
                else {this.Second_Ball_Coming_State="middle-right";this.Second_Ball_current_position={x1:this.screenSize.w+10,y1:(this.screenSize.h/3)*2,x2:this.screenSize.w+30,y2:((this.screenSize.h/3)*2)+20};this.Second_HARD_Block_Area=this.Second_Rect_Arr.middleRight}
            }
            let x=0
            if(this.Second_Level==='HARD'){
                if(this.Second_Ball_Coming_State==='top'){
                        this.Second_Ball_current_position.x1-=20
                        this.Second_Ball_current_position.y1+=9
                        this.Second_Ball_current_position.x2-=20
                        this.Second_Ball_current_position.y2+=9
                        x='right'
                }else if(this.Second_Ball_Coming_State==='top-left'){
                        this.Second_Ball_current_position.x1+=23
                        this.Second_Ball_current_position.y1+=13
                        this.Second_Ball_current_position.x2+=23
                        this.Second_Ball_current_position.y2+=13
                        x='left'
                }else if(this.Second_Ball_Coming_State==='middle-left'){
                        this.Second_Ball_current_position.x1+=18
                        this.Second_Ball_current_position.y1-=8
                        this.Second_Ball_current_position.x2+=18
                        this.Second_Ball_current_position.y2-=8
                        x='left'
                }else if(this.Second_Ball_Coming_State==='top-right'){
                        this.Second_Ball_current_position.x1-=23
                        this.Second_Ball_current_position.y1+=13
                        this.Second_Ball_current_position.x2-=23
                        this.Second_Ball_current_position.y2+=13
                        x='right'
                }else if(this.Second_Ball_Coming_State==='middle-right'){
                        this.Second_Ball_current_position.x1-=18
                        this.Second_Ball_current_position.y1-=8
                        this.Second_Ball_current_position.x2-=18
                        this.Second_Ball_current_position.y2-=8
                        x='right'
                }  
                //////////////////////////////////////////////////////
                /////////////////////////////////////////////////////
                /////////////////////////////////////////////////////
            }else if(this.Second_Level==='MEDIUM'){
                if(this.Second_Ball_Coming_State==='top'){
                    if(this.Second_Ball_current_position.x1<=(this.screenSize.w/3)-20|| this.SC===1){
                        if(this.SC===0)this.SC=1
                        this.Second_Ball_current_position.x1+=13
                        this.Second_Ball_current_position.y1-=6
                        this.Second_Ball_current_position.x2+=13
                        this.Second_Ball_current_position.y2-=6
                        x='left'
                    }else if(this.SC===0){
                        this.Second_Ball_current_position.x1-=10
                        this.Second_Ball_current_position.y1+=9
                        this.Second_Ball_current_position.x2-=10
                        this.Second_Ball_current_position.y2+=9
                        x='right'
                    }
                }else if(this.Second_Ball_Coming_State==='top-left'){
                    if(this.Second_Ball_current_position.y1<=this.screenSize.h/15 || this.SC===1){
                        if(this.SC===0)this.SC=1
                        this.Second_Ball_current_position.x1+=8
                        this.Second_Ball_current_position.y1+=13
                        this.Second_Ball_current_position.x2+=8
                        this.Second_Ball_current_position.y2+=13
                        x='left'
                    }else if(this.SC===0){
                        this.Second_Ball_current_position.x1+=18
                        this.Second_Ball_current_position.y1-=7
                        this.Second_Ball_current_position.x2+=18
                        this.Second_Ball_current_position.y2-=7
                        x='left'
                    }
                }else if(this.Second_Ball_Coming_State==='middle-left'){
                    if(this.Second_Ball_current_position.y1<=140 || this.SC===1){
                        if(this.SC===0)this.SC=1
                        this.Second_Ball_current_position.x1+=8
                        this.Second_Ball_current_position.y1+=13
                        this.Second_Ball_current_position.x2+=8
                        this.Second_Ball_current_position.y2+=13
                        x='left'
                    }else if(this.SC===0){
                        this.Second_Ball_current_position.x1+=15
                        this.Second_Ball_current_position.y1-=8
                        this.Second_Ball_current_position.x2+=15
                        this.Second_Ball_current_position.y2-=8
                        x='left'
                    }
                }else if(this.Second_Ball_Coming_State==='top-right'){
                    if(this.Second_Ball_current_position.y1<=this.screenSize.h/15 || this.SC===1){
                        if(this.SC===0)this.SC=1
                        this.Second_Ball_current_position.x1-=8
                        this.Second_Ball_current_position.y1+=13
                        this.Second_Ball_current_position.x2-=8
                        this.Second_Ball_current_position.y2+=13
                        x='right'
                    }else if(this.SC===0){
                        this.Second_Ball_current_position.x1-=18
                        this.Second_Ball_current_position.y1-=7
                        this.Second_Ball_current_position.x2-=18
                        this.Second_Ball_current_position.y2-=7
                        x='right'
                    }
                }else if(this.Second_Ball_Coming_State==='middle-right'){
                    if(this.Second_Ball_current_position.y1<=140 || this.SC===1){
                        if(this.SC===0)this.SC=1
                        this.Second_Ball_current_position.x1-=8
                        this.Second_Ball_current_position.y1+=13
                        this.Second_Ball_current_position.x2-=8
                        this.Second_Ball_current_position.y2+=13
                        x='right'
                    }else if(this.SC===0){
                        this.Second_Ball_current_position.x1-=14
                        this.Second_Ball_current_position.y1-=9
                        this.Second_Ball_current_position.x2-=14
                        this.Second_Ball_current_position.y2-=9
                        x='right'
                    }
                }  
            }else {
                if(this.Second_Ball_Coming_State==='top'){
                    if(this.Second_Ball_current_position.x1<=(this.screenSize.w/3)-20|| this.SC===1){
                        if(this.SC===0){
                            this.SC=1
                            this.Second_Ball_current_position.x1-=5
                            this.Second_Ball_current_position.y1-=5
                            this.Second_Ball_current_position.x2+=5
                            this.Second_Ball_current_position.y2+=5
                        }
                        this.BALL_SMALLER()
                        x='SMALL'
                    }else if(this.SC===0){
                        this.Second_Ball_current_position.x1-=10
                        this.Second_Ball_current_position.y1+=9
                        this.Second_Ball_current_position.x2-=10
                        this.Second_Ball_current_position.y2+=9
                        x='right'
                    }
                }else if(this.Second_Ball_Coming_State==='top-left'){
                    if(this.Second_Ball_current_position.y1>=this.screenSize.h/2 || this.SC===1){
                        if(this.SC===0){
                            this.SC=1
                            this.Second_Ball_current_position.x1-=5
                            this.Second_Ball_current_position.y1-=5
                            this.Second_Ball_current_position.x2+=5
                            this.Second_Ball_current_position.y2+=5
                        }
                        this.BALL_SMALLER()
                        x='SMALL'
                    }else if(this.SC===0){
                        this.Second_Ball_current_position.x1+=15
                        this.Second_Ball_current_position.y1+=5
                        this.Second_Ball_current_position.x2+=15
                        this.Second_Ball_current_position.y2+=5
                        x='left'
                    }
                }else if(this.Second_Ball_Coming_State==='middle-left'){
                    if(this.Second_Ball_current_position.y1<=this.screenSize.w/13 || this.SC===1){
                        if(this.SC===0){
                            this.SC=1
                            this.Second_Ball_current_position.x1-=5
                            this.Second_Ball_current_position.y1-=5
                            this.Second_Ball_current_position.x2+=5
                            this.Second_Ball_current_position.y2+=5
                        }
                        this.BALL_SMALLER()
                        x='SMALL'
                    }else if(this.SC===0){
                        this.Second_Ball_current_position.x1+=15
                        this.Second_Ball_current_position.y1-=8
                        this.Second_Ball_current_position.x2+=15
                        this.Second_Ball_current_position.y2-=8
                        x='UP_left'
                    }
                }else if(this.Second_Ball_Coming_State==='top-right'){
                    if(this.Second_Ball_current_position.y1>=this.screenSize.h/2 || this.SC===1){
                        if(this.SC===0){
                            this.SC=1
                            this.Second_Ball_current_position.x1-=5
                            this.Second_Ball_current_position.y1-=5
                            this.Second_Ball_current_position.x2+=5
                            this.Second_Ball_current_position.y2+=5
                        }
                        this.BALL_SMALLER()
                        x='SMALL'
                    }else if(this.SC===0){
                        this.Second_Ball_current_position.x1-=15
                        this.Second_Ball_current_position.y1+=5
                        this.Second_Ball_current_position.x2-=15
                        this.Second_Ball_current_position.y2+=5
                        x='right'
                    }
                }else if(this.Second_Ball_Coming_State==='middle-right'){
                    if(this.Second_Ball_current_position.y1<=this.screenSize.w/7 || this.SC===1){
                        if(this.SC===0){
                            this.SC=1
                            this.Second_Ball_current_position.x1-=5
                            this.Second_Ball_current_position.y1-=5
                            this.Second_Ball_current_position.x2+=5
                            this.Second_Ball_current_position.y2+=5
                        }
                        this.BALL_SMALLER()
                        x='SMALL'
                    }else if(this.SC===0){
                        this.Second_Ball_current_position.x1-=14
                        this.Second_Ball_current_position.y1-=9
                        this.Second_Ball_current_position.x2-=14
                        this.Second_Ball_current_position.y2-=9
                        x='UP_right'
                    }
                }  
            }
               
            ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
            let len= (this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1)+this.screenSize.w/25
            if(this.Second_Level==='EASY'){
                len= (this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1)+this.screenSize.w/20
            }
            if(x==='left'){
                ctx.drawImage(document.getElementById('img_left'),this.Second_Ball_current_position.x1,this.Second_Ball_current_position.y1,len,len)
            }else if(x==="right"){
                ctx.drawImage(document.getElementById('img_right'),this.Second_Ball_current_position.x1,this.Second_Ball_current_position.y1,len,len)
            }else if(x==="UP_left"){
                ctx.drawImage(document.getElementById('img_UP_left'),this.Second_Ball_current_position.x1,this.Second_Ball_current_position.y1,len,len)
            }else if(x==="UP_right"){
                ctx.drawImage(document.getElementById('img_UP_right'),this.Second_Ball_current_position.x1,this.Second_Ball_current_position.y1,len,len)
            }else if(x==="SMALL"){
                ctx.drawImage(document.getElementById('SMALL'),this.Second_Ball_current_position.x1,this.Second_Ball_current_position.y1,len,len)
            }
            if(this.Second_Level==="HARD"){
                console.log(this.Second_Ball_Coming_State)
                ctx2.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
                let rect=this.Second_HARD_Block_Area
                ctx2.beginPath();
                ctx2.strokeStyle = "#b5f5ff";
                ctx2.rect(rect.x1,rect.y1,rect.x2-rect.x1,rect.y2-rect.y1);
                ctx2.fillStyle = "#b5f5ff";
                ctx2.fill();
                ctx2.stroke();
            }
                // }else if(x==="small"){
            //     let d=document.getElement

            // }
            
            
        }
        if (this.Second_Mission_State===1){
            
            //this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1<=5
            //this.Second_Ball_current_position.x1>=this.screenSize.w+50||this.Second_Ball_current_position.x2<=-50||this.Second_Ball_current_position.y1>=this.screenSize.h+50||this.Second_Ball_current_position.y2<=-50
            if((this.Second_Ball_current_position.x1>=this.screenSize.w+50||this.Second_Ball_current_position.x2<=-50||this.Second_Ball_current_position.y1>=this.screenSize.h+50||this.Second_Ball_current_position.y2<=-50)|| (this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1<=5)){
                this.Second_Hited_state=0
                ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
                if(this.Second_Level==='HARD')ctx2.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
                this.Second_Mission_State=0
                this.Second_Ball_Coming_State=0
                this.SC=0
                this.Second_Ball_current_position={x1:-20,y1:-20,x2:0,y2:0}
            }else{
                if (this.Second_Hited_state===0){
                    this.Second_Ball_current_position.x1-=7
                    this.Second_Ball_current_position.y1-=7
                    this.Second_Ball_current_position.x2+=7
                    this.Second_Ball_current_position.y2+=7
                    if(this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1>=33){
                        this.Second_Hited_state=1
                    }
                }else if(this.Second_Hited_state===1){
                    this.Second_Ball_current_position.x1+=6
                    this.Second_Ball_current_position.y1+=6
                    this.Second_Ball_current_position.x2-=6
                    this.Second_Ball_current_position.y2-=6
                    if(this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1<=16){
                        this.Second_Hited_state=2
                    }
                }else{
                    this.Second_Ball_current_position.x1-=60
                    this.Second_Ball_current_position.y1-=60
                    this.Second_Ball_current_position.x2-=60
                    this.Second_Ball_current_position.y2-=60
                }
                
                ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
                ctx.beginPath();
                ctx.strokeStyle = "#fbff21";
                ctx.rect(this.Second_Ball_current_position.x1,this.Second_Ball_current_position.y1,this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1,this.Second_Ball_current_position.y2-this.Second_Ball_current_position.y1);
                ctx.fillStyle = "#fbff21";
                ctx.fill();
                ctx.stroke();
            }
        }
        if(this.Second_Mission_State===0&&this.RACKET_POS!='NONE'&&this.RACKET_POS!=undefined
        &&((this.Second_Level!=='HARD' &&tools.IsRacketInsideDetact(this.Second_Ball_current_position,this.RACKET_POS,'ball'))||(this.Second_Level==='HARD' &&tools.IsRacketInsideDetact(this.Second_Ball_current_position,this.RACKET_POS,'ball')&&
        tools.IsRacketInsideDetact(this.RACKET_POS,this.Second_HARD_Block_Area)))){
            // let RACKET_INSIDE=tools.IsRacketInsideDetact(this.Second_Ball_current_position,this.RACKET_POS,'ball')
            let XY=0
            try{
                for (let i=1;i<=2;i++){
                    XY+=Math.abs(this.PRE_RACKET_POS[i].x1-this.PRE_RACKET_POS[i-1].x1)
                    XY+=Math.abs(this.PRE_RACKET_POS[i].y1-this.PRE_RACKET_POS[i-1].y1)  
                }
            }catch(e){XY=20}
            if(XY-XY!==0){XY=20}
            console.log('XY',XY)
            if (XY>=20){
                if(this.Second_Level==='HARD'){
                    ctx2.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
                    let rect=this.Second_HARD_Block_Area
                    ctx2.beginPath();
                    ctx2.strokeStyle = "#b8ffb3";
                    ctx2.rect(rect.x1,rect.y1,rect.x2-rect.x1,rect.y2-rect.y1);
                    ctx2.fillStyle = "#b8ffb3";
                    ctx2.fill();
                    ctx2.stroke();
                }
                this.REPORT.ReactTimes.push(Math.round((this.Second_Ball_Time.Start-this.Timer_S)*1000)/1000)
                // let audio=new Audio()
                // audio.src=require('./../Media/Sound.mp3')
                // audio.play()
                let BPOS=this.Second_Ball_current_position
                // console.log('BPOS',BPOS.x1+((this.RACKET_POS.x2-this.RACKET_POS.x1)/3))
                if(BPOS.x1>=(this.RACKET_POS.x1+((this.RACKET_POS.x2-this.RACKET_POS.x1)/3))&&BPOS.y1>=(this.RACKET_POS.y1+((this.RACKET_POS.y2-this.RACKET_POS.y1)/3))&&
                BPOS.x2<=(this.RACKET_POS.x2-((this.RACKET_POS.x2-this.RACKET_POS.x1)/3))&&BPOS.y2<=(this.RACKET_POS.y2-((this.RACKET_POS.y2-this.RACKET_POS.y1)/3))){
                    this.REPORT.score+=50
                    this.REPORT.AreaA+=1
                }else if(BPOS.x1>=(this.RACKET_POS.x1+((this.RACKET_POS.x2-this.RACKET_POS.x1)/5))&&BPOS.y1>=(this.RACKET_POS.y1+((this.RACKET_POS.y2-this.RACKET_POS.y1)/5))&&
                BPOS.x2<=(this.RACKET_POS.x2-((this.RACKET_POS.x2-this.RACKET_POS.x1)/5))&&BPOS.y2<=(this.RACKET_POS.y2-((this.RACKET_POS.y2-this.RACKET_POS.y1)/5))){
                    this.REPORT.score+=25
                    this.REPORT.AreaB+=1
                }else{
                    this.REPORT.score+=10
                    this.REPORT.AreaC+=1
                }
                this.Add_Score()
                this.Second_Ball_Coming_State=0
                this.Second_Mission_State=1
                this.SC=0
                this.Second_Hited_state=0
                socket.emit('HIT')
                return('add')
                // if(this.)
            }
        }
        
        else if((this.Second_Ball_current_position.x1>=this.screenSize.w+50||this.Second_Ball_current_position.x2<=-50||this.Second_Ball_current_position.y1>=this.screenSize.h+50||this.Second_Ball_current_position.y2<=-50)
            || (this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1<=1)){
            ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
            if(this.Second_Level==='HARD')ctx2.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
            this.Second_Ball_Coming_State=0
            this.SC=0
            this.Second_Mission_State=0
            this.Second_Ball_current_position={x1:-20,y1:-20,x2:0,y2:0}
            this.Second_Hited_state=0

            return('add')
        }
    }
    Third_Loop(){
        
    }
    Mission_Loop(){
        this.LOOP_COUNTER+=1
        if(this.Mission_counter==="DONE"){this.Second_Balled+=1;return "BREAK"}
        else if(this.Mission_counter===1){if(this.First_Mission()==='add')return('add') }
        else if(this.Mission_counter===2){if(this.Second_Loop()==='add')return('add') }
        // else if(this.Mission_counter===3)this.Third_Loop()
        // setTimeout(()=>{this.Mission_Loop()},this.t)
    }
}
const BallIncoming_=new BallIncoming(10)
export {BallIncoming_}
















// Second_Loop(){
//     const canva=document.getElementById('canva1')
//     canva.style.opacity='1'
//     const ctx=canva.getContext('2d')
//     console.log('Mission',this.Mission_counter,'ball',this.Second_Balled)
//     if (this.Timer_S<=0){
//         this.Mission_counter+=1
//         ctx.clearRect(0, 0, 530, 400);
//         return true
//     }
//     if (this.Second_Mission_State===0){
//         if(this.Second_Ball_Coming_State===0){
//             this.Second_Balled+=1
//             this.Second_Ball_Time.Start=this.Timer_S
//             this.Second_Hited_state=0
//             let random=Math.random()
//             if(random>=0.8){this.Second_Ball_Coming_State="top";this.Second_Ball_current_position={x1:this.screenSize.w/1.5,y1:-30,x2:(this.screenSize.w/1.5)+20,y2:-10}}
//             else if(random>=0.6){this.Second_Ball_Coming_State="top-left";this.Second_Ball_current_position={x1:-30,y1:this.screenSize.h/3,x2:-10,y2:(this.screenSize.h/3)+20}}
//             else if(random>=0.4){this.Second_Ball_Coming_State="middle-left";this.Second_Ball_current_position={x1:-30,y1:this.screenSize.h/3,x2:-10,y2:(this.screenSize.h/3)+20}}
//             else if(random>=0.2){this.Second_Ball_Coming_State="top-right";this.Second_Ball_current_position={x1:this.screenSize.w+10,y1:this.screenSize.h/3,x2:this.screenSize.w+30,y2:(this.screenSize.h/3)+20}}
//             else {this.Second_Ball_Coming_State="middle-right";this.Second_Ball_current_position={x1:this.screenSize.w+10,y1:this.screenSize.h/1.3,x2:this.screenSize.w+30,y2:(this.screenSize.h/1.3)+20}}
//         }
//         let x=0
//         if(this.Second_Level==='HARD'){
//             if(this.Second_Ball_Coming_State==='top'){
//                 if(this.Second_Ball_current_position.x1<=(this.screenSize.w/3)-20|| this.SC===1){
//                     if(this.SC===0)this.SC=1
//                     this.Second_Ball_current_position.x1+=13
//                     this.Second_Ball_current_position.y1-=6
//                     this.Second_Ball_current_position.x2+=13
//                     this.Second_Ball_current_position.y2-=6
//                     x='left'
//                 }else if(this.SC===0){
//                     this.Second_Ball_current_position.x1-=10
//                     this.Second_Ball_current_position.y1+=9
//                     this.Second_Ball_current_position.x2-=10
//                     this.Second_Ball_current_position.y2+=9
//                     x='right'
//                 }
//             }else if(this.Second_Ball_Coming_State==='top-left'){
//                 if(this.Second_Ball_current_position.y1<=5 || this.SC===1){
//                     if(this.SC===0)this.SC=1
//                     this.Second_Ball_current_position.x1+=8
//                     this.Second_Ball_current_position.y1+=13
//                     this.Second_Ball_current_position.x2+=8
//                     this.Second_Ball_current_position.y2+=13
//                     x='left'
//                 }else if(this.SC===0){
//                     this.Second_Ball_current_position.x1+=15
//                     this.Second_Ball_current_position.y1-=7
//                     this.Second_Ball_current_position.x2+=15
//                     this.Second_Ball_current_position.y2-=7
//                     x='left'
//                 }
//             }else if(this.Second_Ball_Coming_State==='middle-left'){
//                 if(this.Second_Ball_current_position.y1<=40 || this.SC===1){
//                     if(this.SC===0)this.SC=1
//                     this.Second_Ball_current_position.x1+=8
//                     this.Second_Ball_current_position.y1+=13
//                     this.Second_Ball_current_position.x2+=8
//                     this.Second_Ball_current_position.y2+=13
//                     x='left'
//                 }else if(this.SC===0){
//                     this.Second_Ball_current_position.x1+=15
//                     this.Second_Ball_current_position.y1-=8
//                     this.Second_Ball_current_position.x2+=15
//                     this.Second_Ball_current_position.y2-=8
//                     x='left'
//                 }
//             }else if(this.Second_Ball_Coming_State==='top-right'){
//                 if(this.Second_Ball_current_position.y1<=5 || this.SC===1){
//                     if(this.SC===0)this.SC=1
//                     this.Second_Ball_current_position.x1-=8
//                     this.Second_Ball_current_position.y1+=13
//                     this.Second_Ball_current_position.x2-=8
//                     this.Second_Ball_current_position.y2+=13
//                     x='right'
//                 }else if(this.SC===0){
//                     this.Second_Ball_current_position.x1-=15
//                     this.Second_Ball_current_position.y1-=7
//                     this.Second_Ball_current_position.x2-=15
//                     this.Second_Ball_current_position.y2-=7
//                     x='right'
//                 }
//             }else if(this.Second_Ball_Coming_State==='middle-right'){
//                 if(this.Second_Ball_current_position.y1<=40 || this.SC===1){
//                     if(this.SC===0)this.SC=1
//                     this.Second_Ball_current_position.x1-=8
//                     this.Second_Ball_current_position.y1+=13
//                     this.Second_Ball_current_position.x2-=8
//                     this.Second_Ball_current_position.y2+=13
//                     x='right'
//                 }else if(this.SC===0){
//                     this.Second_Ball_current_position.x1-=14
//                     this.Second_Ball_current_position.y1-=9
//                     this.Second_Ball_current_position.x2-=14
//                     this.Second_Ball_current_position.y2-=9
//                     x='right'
//                 }
//             }  
//             //////////////////////////////////////////////////////
//             /////////////////////////////////////////////////////
//             /////////////////////////////////////////////////////
//         }else {
//             if(this.Second_Ball_Coming_State==='top'){
//                 if(this.Second_Ball_current_position.x1<=(this.screenSize.w/3)-20|| this.SC===1){
//                     if(this.SC===0)this.SC=1
//                     this.BALL_SMALLER()
//                     x='left'
//                 }else if(this.SC===0){
//                     this.Second_Ball_current_position.x1-=10
//                     this.Second_Ball_current_position.y1+=9
//                     this.Second_Ball_current_position.x2-=10
//                     this.Second_Ball_current_position.y2+=9
//                     x='right'
//                 }
//             }else if(this.Second_Ball_Coming_State==='top-left'){
//                 if(this.Second_Ball_current_position.y1<=45 || this.SC===1){
//                     if(this.SC===0)this.SC=1
//                     this.BALL_SMALLER()
//                     x='left'
//                 }else if(this.SC===0){
//                     this.Second_Ball_current_position.x1+=15
//                     this.Second_Ball_current_position.y1-=5
//                     this.Second_Ball_current_position.x2+=15
//                     this.Second_Ball_current_position.y2-=5
//                     x='left'
//                 }
//             }else if(this.Second_Ball_Coming_State==='middle-left'){
//                 if(this.Second_Ball_current_position.y1<=60 || this.SC===1){
//                     if(this.SC===0)this.SC=1
//                     this.BALL_SMALLER()
//                     x='left'
//                 }else if(this.SC===0){
//                     this.Second_Ball_current_position.x1+=15
//                     this.Second_Ball_current_position.y1-=8
//                     this.Second_Ball_current_position.x2+=15
//                     this.Second_Ball_current_position.y2-=8
//                     x='left'
//                 }
//             }else if(this.Second_Ball_Coming_State==='top-right'){
//                 if(this.Second_Ball_current_position.y1<=45 || this.SC===1){
//                     if(this.SC===0)this.SC=1
//                     this.BALL_SMALLER()
//                     x='right'
//                 }else if(this.SC===0){
//                     this.Second_Ball_current_position.x1-=15
//                     this.Second_Ball_current_position.y1-=5
//                     this.Second_Ball_current_position.x2-=15
//                     this.Second_Ball_current_position.y2-=5
//                     x='right'
//                 }
//             }else if(this.Second_Ball_Coming_State==='middle-right'){
//                 if(this.Second_Ball_current_position.y1<=60 || this.SC===1){
//                     if(this.SC===0)this.SC=1
//                     this.BALL_SMALLER()
//                     x='right'
//                 }else if(this.SC===0){
//                     this.Second_Ball_current_position.x1-=14
//                     this.Second_Ball_current_position.y1-=9
//                     this.Second_Ball_current_position.x2-=14
//                     this.Second_Ball_current_position.y2-=9
//                     x='right'
//                 }
//             }  
//         }
           
//         ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
//         let len= (this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1)+15
//         if(x==='left'){
//             ctx.drawImage(document.getElementById('img_left'),this.Second_Ball_current_position.x1,this.Second_Ball_current_position.y1,len,len)
//         }else if(x==="right"){
//             ctx.drawImage(document.getElementById('img_right'),this.Second_Ball_current_position.x1,this.Second_Ball_current_position.y1,len,len)
//         }
//             // }else if(x==="small"){
//         //     let d=document.getElement

//         // }
        
        
//     }
//     if (this.Second_Mission_State===1){
        
//         //this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1<=5
//         //this.Second_Ball_current_position.x1>=this.screenSize.w+50||this.Second_Ball_current_position.x2<=-50||this.Second_Ball_current_position.y1>=this.screenSize.h+50||this.Second_Ball_current_position.y2<=-50
//         if((this.Second_Ball_current_position.x1>=this.screenSize.w+50||this.Second_Ball_current_position.x2<=-50||this.Second_Ball_current_position.y1>=this.screenSize.h+50||this.Second_Ball_current_position.y2<=-50)|| (this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1<=5)){
//             this.Second_Hited_state=0
//             ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
            
//             this.Second_Mission_State=0
//             this.Second_Ball_Coming_State=0
//             this.SC=0
//             this.Second_Ball_current_position={x1:-20,y1:-20,x2:0,y2:0}
//         }else{
//             if (this.Second_Hited_state===0){
//                 this.Second_Ball_current_position.x1-=7
//                 this.Second_Ball_current_position.y1-=7
//                 this.Second_Ball_current_position.x2+=7
//                 this.Second_Ball_current_position.y2+=7
//                 if(this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1>=33){
//                     this.Second_Hited_state=1
//                 }
//             }else if(this.Second_Hited_state===1){
//                 this.Second_Ball_current_position.x1+=6
//                 this.Second_Ball_current_position.y1+=6
//                 this.Second_Ball_current_position.x2-=6
//                 this.Second_Ball_current_position.y2-=6
//                 if(this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1<=16){
//                     this.Second_Hited_state=2
//                 }
//             }else{
//                 this.Second_Ball_current_position.x1-=20
//                 this.Second_Ball_current_position.y1-=20
//                 this.Second_Ball_current_position.x2-=20
//                 this.Second_Ball_current_position.y2-=20
//             }
            
//             ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
//             ctx.beginPath();
//             ctx.strokeStyle = "#fbff21";
//             ctx.rect(this.Second_Ball_current_position.x1,this.Second_Ball_current_position.y1,this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1,this.Second_Ball_current_position.y2-this.Second_Ball_current_position.y1);
//             ctx.fillStyle = "#fbff21";
//             ctx.fill();
//             ctx.stroke();
//         }
//     }
//     if(this.Second_Mission_State===0&&this.RACKET_POS!='NONE'&&this.RACKET_POS!=undefined&&tools.IsRacketInsideDetact(this.Second_Ball_current_position,this.RACKET_POS,'ball')){
//         // let RACKET_INSIDE=tools.IsRacketInsideDetact(this.Second_Ball_current_position,this.RACKET_POS,'ball')
//         let XY=0
//         try{
//             for (let i=1;i<=2;i++){
//                 XY+=Math.abs(this.PRE_RACKET_POS[i].x1-this.PRE_RACKET_POS[i-1].x1)
//                 XY+=Math.abs(this.PRE_RACKET_POS[i].y1-this.PRE_RACKET_POS[i-1].y1)  
//             }
//         }catch(e){
//             XY=50
//         }
        
//         if(XY-XY!==0){XY=50}
//         console.log('XY',XY)
//         if (XY>=50){
            
//             this.REPORT.ReactTimes.push(Math.round((this.Second_Ball_Time.Start-this.Timer_S)*1000)/1000)
//             let audio=new Audio()
//             audio.src=require('./../Media/Sound.mp3')
//             audio.play()
//             let BPOS=this.Second_Ball_current_position
//             // console.log('BPOS',BPOS.x1+((this.RACKET_POS.x2-this.RACKET_POS.x1)/3))
//             if(BPOS.x1>=(this.RACKET_POS.x1+((this.RACKET_POS.x2-this.RACKET_POS.x1)/3))&&BPOS.y1>=(this.RACKET_POS.y1+((this.RACKET_POS.y2-this.RACKET_POS.y1)/3))&&
//             BPOS.x2<=(this.RACKET_POS.x2-((this.RACKET_POS.x2-this.RACKET_POS.x1)/3))&&BPOS.y2<=(this.RACKET_POS.y2-((this.RACKET_POS.y2-this.RACKET_POS.y1)/3))){
//                 this.REPORT.score+=50
//                 this.REPORT.AreaA+=1
//             }else if(BPOS.x1>=(this.RACKET_POS.x1+((this.RACKET_POS.x2-this.RACKET_POS.x1)/5))&&BPOS.y1>=(this.RACKET_POS.y1+((this.RACKET_POS.y2-this.RACKET_POS.y1)/5))&&
//             BPOS.x2<=(this.RACKET_POS.x2-((this.RACKET_POS.x2-this.RACKET_POS.x1)/5))&&BPOS.y2<=(this.RACKET_POS.y2-((this.RACKET_POS.y2-this.RACKET_POS.y1)/5))){
//                 this.REPORT.score+=25
//                 this.REPORT.AreaB+=1
//             }else{
//                 this.REPORT.score+=10
//                 this.REPORT.AreaC+=1
//             }
//             this.Second_Ball_Coming_State=0
//             this.Second_Mission_State=1
//             this.SC=0
//             this.Second_Hited_state=0
//             // if(this.)
//         }
//     } else if((this.Second_Ball_current_position.x1>=this.screenSize.w+50||this.Second_Ball_current_position.x2<=-50||this.Second_Ball_current_position.y1>=this.screenSize.h+50||this.Second_Ball_current_position.y2<=-50)
//         || (this.Second_Ball_current_position.x2-this.Second_Ball_current_position.x1<=5)){
//         ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
        
//         this.Second_Ball_Coming_State=0
//         this.SC=0
//         this.Second_Mission_State=0
//         this.Second_Ball_current_position={x1:-20,y1:-20,x2:0,y2:0}
//         this.Second_Hited_state=0

//         return
//     }
// }











// if(this.Second_Mission_State===0&&this.RACKET_POS!='NONE'&&this.RACKET_POS!=undefined){
//     let RACKET_INSIDE=tools.IsRacketInsideDetact(this.Second_Ball_current_position,this.RACKET_POS,'all')
//     let XY=0
//     for (let i=1;i<=2;i++){
//         XY+=Math.abs(this.PRE_RACKET_POS[i].x1-this.PRE_RACKET_POS[i-1].x1)
//         XY+=Math.abs(this.PRE_RACKET_POS[i].y1-this.PRE_RACKET_POS[i-1].y1)  
//     }
//     if(XY-XY!==0){XY=100}
//     console.log('XY',XY)
//     if (RACKET_INSIDE===true&&XY>=100){
//         let BPOS=this.Second_Ball_current_position
//         // console.log('BPOS',BPOS.x1+((this.RACKET_POS.x2-this.RACKET_POS.x1)/3))
//         if(BPOS.x1>=(this.RACKET_POS.x1+((this.RACKET_POS.x2-this.RACKET_POS.x1)/3))&&BPOS.y1>=(this.RACKET_POS.y1+((this.RACKET_POS.y2-this.RACKET_POS.y1)/3))&&
//         BPOS.x2<=(this.RACKET_POS.x2-((this.RACKET_POS.x2-this.RACKET_POS.x1)/3))&&BPOS.y2<=(this.RACKET_POS.y2-((this.RACKET_POS.y2-this.RACKET_POS.y1)/3))){
//             this.TOTAL_SCORES+=50
//         }else if(BPOS.x1>=(this.RACKET_POS.x1+((this.RACKET_POS.x2-this.RACKET_POS.x1)/5))&&BPOS.y1>=(this.RACKET_POS.y1+((this.RACKET_POS.y2-this.RACKET_POS.y1)/5))&&
//         BPOS.x2<=(this.RACKET_POS.x2-((this.RACKET_POS.x2-this.RACKET_POS.x1)/5))&&BPOS.y2<=(this.RACKET_POS.y2-((this.RACKET_POS.y2-this.RACKET_POS.y1)/5))){
//             this.TOTAL_SCORES+=25
//         }else{
//             this.TOTAL_SCORES+=10
//         }
//         this.Second_Mission_State=1
//         // if(this.)
//     }
// } else if(this.Second_Ball_current_position.x1>=this.screenSize.w||this.Second_Ball_current_position.x2<=0||this.Second_Ball_current_position.y1>=this.screenSize.h||this.Second_Ball_current_position.y2<=0){
//     ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
//     this.Second_Balled+=1
//     this.Second_Mission_State=0
//     this.Second_Ball_current_position={x1:0,y1:0,x2:20,y2:20}
// }

























// First_Mission(){
//     const canva=document.getElementById('canva2')
//     const ctx=canva.getContext('2d')

//     console.log('Mission',this.Mission_counter,'First_state',this.First_Mission_State)
//     if ((this.First_Mission_State>=this.First_Mission_List.length)&&this.First_Mission_Each_Time_State==0){
//         this.Mission_counter="DONE"
//         ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
        
//         return true
//     }
//     let rect=this.First_Mission_Pos_Arr[this.First_Mission_List[this.First_Mission_State]]
//     if (this.First_Mission_Timeout_State==0&&this.First_Mission_Each_Time_State==0 && this.First_Mission_State<this.First_Mission_List.length){
//         this.First_Mission_Each_Time_State=0
//         ctx.clearRect(0, 0,  this.screenSize.w, this.screenSize.h);
//         ctx.beginPath();
//         ctx.strokeStyle = "#b5f5ff";
//         ctx.rect(rect.x1,rect.y1,rect.x2-rect.x1,rect.y2-rect.y1);
//         ctx.fillStyle = "#b5f5ff";
//         ctx.fill();
//         ctx.stroke();
//         this.First_Mission_Timeout_State=1
//         this.First_Mission_Timer=setTimeout(()=>{
//             this.Current_First_Mission_State=this.First_Mission_State
//             if (this.Current_First_Mission_State===this.First_Mission_State){
//                 this.First_Mission_Each_Time_State=1
//                 let t=setTimeout(()=>{this.First_Mission_Each_Time_State=0;clearTimeout(t)},1000)
//                 ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
//                 ctx.beginPath();
//                 ctx.strokeStyle = "#ffbfb5";
//                 ctx.rect(rect.x1,rect.y1,rect.x2-rect.x1,rect.y2-rect.y1);
//                 ctx.fillStyle = "#ffbfb5";
//                 ctx.fill();
//                 ctx.stroke();
//                 this.First_Mission_State+=1
//                 this.First_Mission_Timeout_State=0
//             }
//             this.First_Mission_Timeout_State=0
//             clearTimeout(this.First_Mission_Timer)
//         },this.Time_Limit)
//     }
//     if(this.RACKET_POS!='NONE'&&this.RACKET_POS!=undefined&&this.First_Mission_Each_Time_State==0&&this.First_Mission_State<this.First_Mission_List.length&& tools.IsRacketInsideDetact(this.RACKET_POS,rect)===true){
//         this.First_Mission_Each_Time_State=1
//         let t=setTimeout(()=>{this.First_Mission_Each_Time_State=0;clearTimeout(t)},1000)
//         ctx.clearRect(0, 0, this.screenSize.w, this.screenSize.h);
//         ctx.beginPath();
//         ctx.strokeStyle = "#b8ffb3";
//         ctx.rect(rect.x1,rect.y1,rect.x2-rect.x1,rect.y2-rect.y1);
//         ctx.fillStyle = "#b8ffb3";
//         ctx.fill();
//         ctx.stroke();
//         this.First_Mission_State+=1
//         this.First_Mission_Timeout_State=0
//         this.REPORT.score+=this.NEXT_ADD
//         this.NEXT_ADD+=5
//         this.Time_Limit-=200
//         clearTimeout(this.First_Mission_Timer)
//     }  
// }