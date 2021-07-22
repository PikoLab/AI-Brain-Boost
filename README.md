# AI-Brain-Boost(Front-End)
The Fullstack AI project for Detecting Face!

## 1. JWT & Session
```
const token=window.sessionStorage.getItem('token');

fetch('http://localhost:3000/signin', {
      method: 'post',
      headers:{
        'Content-Type':'application/json',
        'Authorization': token
      },
    })

```
## 2. Multiple Face Detection
![image](https://github.com/PikoLab/AI-Brain-Boost/blob/main/faceDetection.jpg)
## 3. AWS Lambda Function
## 4. Modify and Update Profile Info
![image](https://github.com/PikoLab/AI-Brain-Boost/blob/main/updateProfile.jpg)
