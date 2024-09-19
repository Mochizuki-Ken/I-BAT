from flask import Flask, jsonify, request,Response, render_template
import cv2
def detect_body(frame):
    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Load the body detector model
    body_cascade = cv2.CascadeClassifier('./haarcascade_fullbody.xml')

    # Detect bodies in the grayscale image
    bodies = body_cascade.detectMultiScale(gray, 1.1, 4)

    # Draw a rectangle around each detected body
    for (x, y, w, h) in bodies:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

    return frame
def generate_frames(file):
    # Open the video file
    cap = cv2.VideoCapture(file)

    while cap.isOpened():
        # Read a frame from the video file
        success, frame = cap.read()

        if not success:
            break

        # Perform body detection on the frame
        frame = detect_body(frame)

        # Convert the frame to JPEG format
        ret, buffer = cv2.imencode('.jpg', frame)

        # Convert the JPEG image to bytes and yield it to Flask
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    # Release the video file
    cap.release()
app = Flask(__name__)



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
if __name__=="__main__":
    app.run(host='127.0.0.1',port=8000,debug=True)