import cv2

cap=cv2.VideoCapture(0)
while cv2.waitKey(33)<0:
    ret, frame = cap.read()
    cv2.imshow('n',frame)
cv2.destroyAllWindows()
cap.release()