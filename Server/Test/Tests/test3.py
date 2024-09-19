import cv2 

cap=cv2.VideoCapture(0)

tracker =cv2.legacy.TrackerCSRT_create()
success,frame=cap.read()
bbox=cv2.selectROI('track',frame,False)
tracker.init(frame,bbox)

def drawBox(frame,bbox):
    x,y,w,h=int(bbox[0]),int(bbox[1]),int(bbox[2]),int(bbox[3])
    cv2.rectangle(frame,(x,y),((x+w),(y+h)),(200,20,200),3,1)
    cv2.putText(frame,"TRACKING OBJECT",(10,50),cv2.FONT_HERSHEY_COMPLEX,0.7,((20,200,20)),2)

while True:
    timer =cv2.getTickCount()
    success,frame=cap.read()

    success2,bbox=tracker.update(frame)

    if success2:
        drawBox(frame,bbox)
    else:
        cv2.putText(frame,"LOST OBJECT",(10,50),cv2.FONT_HERSHEY_COMPLEX,0.7,(92,20,90),2)

    fps=cv2.getTickFrequency()/(cv2.getTickCount()-timer)
    if success:
        cv2.putText(frame,str(int(fps)),(10,20),cv2.FONT_HERSHEY_COMPLEX,0.7,(90,90,90),2)
        cv2.imshow('trecting',frame)
        if cv2.waitKey(1) == ord('q'):
            break