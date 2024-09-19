import cv2
import mediapipe as mp
import time
mpDraw = mp.solutions.drawing_utils
mpPose = mp.solutions.pose
pose = mpPose.Pose()
cap = cv2.VideoCapture(0)

# img = cv2.VideoCapture('/5926.mp4')
pTime = 0

person=False
moved=False

fps_location=270

last_body_location=[]
while True:
    success, img = cap.read()
    img=cv2.resize(img,(0,0),fx=1.8,fy=1.8)
    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = pose.process(imgRGB)
    # print(results.pose_landmarks)
    if results.pose_landmarks:
        fps_location=190
        cv2.putText(img,"Preson",(10,50), cv2.FONT_HERSHEY_PLAIN, 3,(0, 255, 0), 3)
        mpDraw.draw_landmarks(img, results.pose_landmarks, mpPose.POSE_CONNECTIONS)
        arr=[]
        for id, lm in enumerate(results.pose_landmarks.landmark):
            arr.append([lm.x,lm.y])
            h, w, c = img.shape
            print(id, lm)
            cx, cy = int(lm.x * w), int(lm.y * h)
            cv2.circle(img, (cx, cy), 5, (255, 0, 0), cv2.FILLED)
        last_body_location=(arr)
    else:
        fps_location=270
        # cv2.putText(img,"NO Preson",(10,50), cv2.FONT_HERSHEY_PLAIN, 3,(0, 0, 255), 3)
    cTime = time.time()
    fps = 1 / (cTime - pTime)
    pTime = cTime
    cv2.putText(img, str(int(fps)), (fps_location, 50), cv2.FONT_HERSHEY_PLAIN, 3,
                (255, 0, 0), 3)
    cv2.imshow("Image", img)
    if cv2.waitKey(1) == ord('q'):
        break

print('!!!!!!!!!!!!last_body_location!!!!!!!!!!!!','\n',last_body_location)
