import cv2
import numpy as np
img = cv2.imread('./media_file/court.jpg')
img=cv2.resize(img,(400,400))
imgContour = img.copy()


cv2.imshow('img',img)
# 

hsv=cv2.cvtColor(img,cv2.COLOR_BGR2HSV)
img = hsv

lower = np.array([8, 0, 147])
upper = np.array([107,69,255])
mask = cv2.inRange(hsv, lower, upper)

cv2.imshow('img2',img)

canny = cv2.Canny(mask, 350, 350)

contours, hierarchy = cv2.findContours(canny, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
for cnt in contours:
    cv2.drawContours(imgContour, cnt, -1, (255, 0, 0), 4)


cv2.imshow('canny',canny)
cv2.imshow('contours',imgContour)

cv2.waitKey(0)