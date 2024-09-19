import math 
class Court():
    def __init__(self,a,b,c,d):# a=[x,y] b=[x,y] c=[x,y] d=[x,y]
       self.B_Line1={'a':{'x':a[0],'y':a[1]},'b':{'x':b[0],'y':b[1]}}
       self.B_Line2={'a':{'x':c[0],'y':c[1]},'b':{'x':d[0],'y':d[1]}}
       self.B_Line3={'a':{'x':a[0],'y':a[1]},'b':{'x':c[0],'y':c[1]}}
       self.B_Line4={'a':{'x':b[0],'y':b[1]},'b':{'x':d[0],'y':d[1]}}
       self.m_line={'a':{'x':self.m1(a,c),'y':((c[1]-a[1])/2)+a[1]},'b':{'x':self.m1(b,d),'y':((d[1]-b[1])/2)+b[1]}}

    def draw_Court():
        pass

    def m1(self,a,c):
        if c[0]==a[0]:
            return a[0]
        elif c[0]>a[0]:
            return ((c[0]-a[0])/2)
        else:
            return ((a[0]-c[0])/2)

    def output(self):
        print(self.B_Line1,self.B_Line2,self.B_Line3,self.B_Line4,self.m_line)

court=Court([67,28],[327,31],[5,334],[396,337])

court.output()
'''
a        b




c        d
67 28
327 31
5 334
396 337
'''