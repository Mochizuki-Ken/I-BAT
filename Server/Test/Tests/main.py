import cv2
 # Create a VideoCapture object to read the video file
import torch
import mediapipe as mp
import time
model = torch.hub.load('ultralytics/yolov5', 'custom', path="C:/Users/ac000/Desktop/I-BAT/ML/Model/bestRacket.pt")
cap = cv2.VideoCapture(0 )
mpDraw = mp.solutions.drawing_utils
mpPose = mp.solutions.pose
pose = mpPose.Pose()
pTime = 0

person=False
moved=False

fps_location=270

last_body_location=[]
while(cap.isOpened()):
    # Read the current frame
    ret, frame = cap.read()
    frame=cv2.resize(frame,(0,0),fx=1.8,fy=1.8)
    imgRGB = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result_pose = pose.process(imgRGB)
     # Display the current frame in a window
    result_racket = model(frame)  # Perform detection
    if result_pose.pose_landmarks:
        fps_location=190
        mpDraw.draw_landmarks(frame, result_pose.pose_landmarks, mpPose.POSE_CONNECTIONS)
        arr=[]
        for id, lm in enumerate(result_pose.pose_landmarks.landmark):
            arr.append([lm.x,lm.y])
            h, w, c = frame.shape
            print(id, lm)
            cx, cy = int(lm.x * w), int(lm.y * h)
            cv2.circle(frame, (cx, cy), 5, (255, 0, 0), cv2.FILLED)
        last_body_location=(arr)
    else:
        fps_location=270
        # cv2.putText(img,"NO Preson",(10,50), cv2.FONT_HERSHEY_PLAIN, 3,(0, 0, 255), 3)
    # cTime = time.time()
    # fps = 1 / (cTime - pTime)
    # pTime = cTime
    for detection in result_racket.xyxy[0]:
        print(int(detection[0]))
        
        label = "Racket"
        score = detection[4]
        cv2.rectangle(frame, (int(detection[0]), int(detection[1])), (int(detection[2]), int(detection[3])), (5, 5, 160), 2)
        # cv2.putText(frame, f'{label} {score:.2f}', (int(detection[0]), int(detection[1] - 10)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1, cv2.LINE_AA)
    cv2.imshow('Video', frame)
     # Wait for user input (1ms)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
 # Release the VideoCapture object and close the window
cap.release()
cv2.destroyAllWindows()