# AI-Brain-Boost
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
## 3. AWS Lambda Function
