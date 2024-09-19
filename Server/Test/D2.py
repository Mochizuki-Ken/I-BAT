import cv2
 # Create a VideoCapture object to read the video file
import torch

model = torch.hub.load('ultralytics/yolov5', 'custom', path="C:/Users/ac000/Desktop/bestRacket.pt")
cap = cv2.VideoCapture("C:/Users/ac000/Downloads/IMG_3144.MP4")
while(cap.isOpened()):
    # Read the current frame
    ret, frame = cap.read()
     # Display the current frame in a window
    result = model(frame)  # Perform detection

    for detection in result.xyxy[0]:
        print(int(detection[0]))
        
        label = "Racket"
        score = detection[4]
        cv2.rectangle(frame, (int(detection[0]), int(detection[1])), (int(detection[2]), int(detection[3])), (5, 5, 160), 2)
        # cv2.putText(frame, f'{label} {score:.2f}', (int(detection[0]), int(detection[1] - 10)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1, cv2.LINE_AA)
    cv2.imshow('Video', frame)
     # Wait for user input (1ms)
    if cv2.waitKey(25) & 0xFF == ord('q'):
        break
 # Release the VideoCapture object and close the window
cap.release()
cv2.destroyAllWindows()