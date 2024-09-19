from flask import Flask, request, Response,jsonify
from flask_cors import CORS,cross_origin
# from flask_socketio import SocketIO
import torch
import numpy as np
import urllib
import base64
from PIL import Image
from io import BytesIO
# "C:/Users/ac000/Desktop/I-BAT/ML/Model/bestRacket.pt"
model = torch.hub.load('ultralytics/yolov5', 'custom', path="C:/Users/ac000/Desktop/I-BAT/ML/Model/SmallRacket.pt")

import cv2
import json

# from OpenSSL import SSL
# context = SSL.Context(SSL.TLSv1_2_METHOD)
# context.use_privatekey_file('server.key')
# context.use_certificate_file('server.crt')   
import ssl

app = Flask(__name__)
import codecs
CORS(app,resources={r"/*":{"origins":"*"}})
@app.route('/racket', methods=['GET'])
@cross_origin(origin='/*',headers=['Content-Type','Authorization'])
def Hi():
    
    return 'IN HTTPS'

# @app.route('/video', methods=['POST'])
# @cross_origin(origin='/*',headers=['Content-Type','Authorization'])
# def video():
#     buffer =b''
#     while True:
#         chunk = request.stream.read(1024)
        
#         if not chunk:
#             break
#         buffer += chunk
#     # print(buffer)
#     return Response(buffer, mimetype='video/mp4')


@app.route('/racket', methods=['POST'])
@cross_origin(origin='/*',headers=['Content-Type','Authorization'])
def racket():
    try:
        data=request.get_json()
        response=jsonify(data)
        data=codecs.decode(response.response[0],'utf-8')
    except:
        return {"data":"NONE"}

    # binary_data = a2b_base64(data)
    data=json.loads(data)
    response = urllib.request.urlopen(data['data'])
    response=response.file.read()
    img=np.array(bytearray(response), dtype="uint8")
    img=cv2.imdecode(img, cv2.IMREAD_COLOR)
    result = model(img)  
    # for detection in result.xyxy[0]:
    # print(int(detection[0]))
        # return {"data":str(int(detection[0]))}


        # label = "Racket"
        # score = detection[4]
        # cv2.rectangle(img, (int(detection[0]), int(detection[1])), (int(detection[2]), int(detection[3])), (0, 255, 0), 2)
        # cv2.putText(img, f'{label} {score:.2f}', (int(detection[0]), int(detection[1] - 10)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1, cv2.LINE_AA)
    
    

    try:
        return {"data":[
            [int(result.xyxy[0][0][0]),int(result.xyxy[0][0][1])],
            [int(result.xyxy[0][0][2]),int(result.xyxy[0][0][3])]
            
            ]}
    except:
        return {'data':"NONE"}
    ret, buffer = cv2.imencode('.jpg', img)
    image_bytes = base64.b64encode(buffer).decode('utf-8')
    data_url = f'data:image/jpeg;base64,{image_bytes}'
    
    return {'data':data_url}


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=3001,ssl_context=('C:\Windows\System32\example.com+5.pem','C:\Windows\System32\example.com+5-key.pem'))
