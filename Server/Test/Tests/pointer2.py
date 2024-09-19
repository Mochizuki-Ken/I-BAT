import cv2 
import cmath
img = cv2.imread('./media_file/c3.jpeg')#'./media_file/BC2.png'
img=cv2.resize(img,(0,0),fx=0.5,fy=0.5)

class Court():
    
    def __init__(self,a,b,c,d):# a=[x,y] b=[x,y] c=[x,y] d=[x,y]
       self.B_Line1={'a':{'x':a[0],'y':a[1]},'b':{'x':b[0],'y':b[1]}}
       self.B_Line2={'a':{'x':c[0],'y':c[1]},'b':{'x':d[0],'y':d[1]}}
       self.B_Line3={'a':{'x':a[0],'y':a[1]},'b':{'x':c[0],'y':c[1]}}
       self.B_Line4={'a':{'x':b[0],'y':b[1]},'b':{'x':d[0],'y':d[1]}}
       self.m_line={'a':{'x':self.m1(a,c),'y':self.m2(a,c)},'b':{'x':self.m1(b,d),'y':self.m2(b,d)}}
       self.m_s_line1={}
       self.m_s_line2={}
       self.b_s_line={}
       self.b_s_line2={}
       self.P_line1={}
       self.P_line2={}
       self.P_line3={}
       self.P_line4={}

    def draw_Court(self):
        global img
        img = cv2.line(img,(self.B_Line1['a']['x'],self.B_Line1['a']['y']), (self.B_Line1['b']['x'],self.B_Line1['b']['y']), (230,20,0), 2,lineType=cv2.LINE_AA)
        img = cv2.line(img,(self.B_Line2['a']['x'],self.B_Line2['a']['y']), (self.B_Line2['b']['x'],self.B_Line2['b']['y']), (230,20,0), 2,lineType=cv2.LINE_AA)
        img = cv2.line(img,(self.B_Line3['a']['x'],self.B_Line3['a']['y']), (self.B_Line3['b']['x'],self.B_Line3['b']['y']), (230,20,0), 2,lineType=cv2.LINE_AA)
        img = cv2.line(img,(self.B_Line4['a']['x'],self.B_Line4['a']['y']), (self.B_Line4['b']['x'],self.B_Line4['b']['y']), (230,20,0), 2,lineType=cv2.LINE_AA)
        img = cv2.line(img,(int(self.m_line['a']['x']),int(self.m_line['a']['y'])), (int(self.m_line['b']['x']),int(self.m_line['b']['y'])),(230,200,0),2,lineType=cv2.LINE_AA)
        cv2.imshow('img2',img)
    def m1(self,a,c):
        print(a,c)

        m_line_x=None
        if c[0]==a[0]:
            m_line_x=a[0]
        elif c[0]>a[0]:
            m_line_x=(((c[0]-a[0])/2)+a[0])
        else:
            m_line_x=(((a[0]-c[0])/2)+c[0])

        if ((self.B_Line1['b']['x']-self.B_Line1['a']['x']>self.B_Line1['b']['y']-self.B_Line1['a']['y']) and self.B_Line1['b']['y']-self.B_Line1['a']['y']>0) or ((self.B_Line1['b']['x']-self.B_Line1['a']['x']>self.B_Line1['a']['y']-self.B_Line1['b']['y']) and self.B_Line1['a']['y']-self.B_Line1['b']['y']>0):
            return(m_line_x)
            
        else:
            print('else')
            if (self.B_Line1['b']['y']-self.B_Line1['a']['y'])==(self.B_Line2['b']['y']-self.B_Line2['a']['y']):
                return m_line_x
            elif (self.B_Line1['b']['y']-self.B_Line1['a']['y'])<(self.B_Line2['b']['y']-self.B_Line2['a']['y']):
                return (m_line_x*((self.B_Line1['b']['y'])/(self.B_Line2['b']['y'])))# -self.B_Line2['a']['y']
            else:
                return (m_line_x*((self.B_Line2['b']['y'])/(self.B_Line1['b']['y'])))

    def m2(self,a,c):#m_line y postion
        m_line_y=((a[1]+c[1])/2)#+a[1]#
        if ((self.B_Line1['b']['x']-self.B_Line1['a']['x']>self.B_Line1['b']['y']-self.B_Line1['a']['y']) and self.B_Line1['b']['y']-self.B_Line1['a']['y']>0) or ((self.B_Line1['b']['x']-self.B_Line1['a']['x']>self.B_Line1['a']['y']-self.B_Line1['b']['y']) and self.B_Line1['a']['y']-self.B_Line1['b']['y']>0):
            print()
            
            if (self.B_Line1['b']['x']-self.B_Line1['a']['x'])==(self.B_Line2['b']['x']-self.B_Line2['a']['x']):
                return (((c[1]-a[1])/2)+a[1])
            else:
                print(cmath.sqrt(((abs(a[0]-c[0]))**2)+((abs(a[1]-c[1]))**2)).real)
                return int(cmath.sqrt((abs(a[0]-c[0])**2)+(abs(a[1]-c[1])**2)).real/2)
                return (((m_line_y)*(((self.B_Line1['b']['x']-self.B_Line1['a']['x'])/(self.B_Line2['b']['x']-self.B_Line2['a']['x'])))))
            
                
        else:
            
            return(m_line_y)#
            


    def output(self):
        print(self.B_Line1,self.B_Line2,self.B_Line3,self.B_Line4,self.m_line)

# court=Court([67,28],[327,31],[5,334],[396,337])

# court.output()
# court.draw_Court()

cv2.imshow('img',img)

arr=[]
def mousePoint(e,x,y,flags,prams):
    global arr
    if e==cv2.EVENT_LBUTTONDOWN:
        print(x,y)
        arr.append([x,y])
        print(arr)
        cv2.circle(img,(x,y),5,(250,0,0),-1,cv2.LINE_AA)
        cv2.imshow('img',img)
        if len(arr)==4:
            court=Court(arr[0],arr[1],arr[2],arr[3])
            court.output()
            court.draw_Court()
            arr=[]
        





cv2.setMouseCallback('img',mousePoint)

cv2.waitKey(0)