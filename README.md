# monitoring-project

## Installation
<br/>

### 1. git clone
```
git clone https://github.com/StudyTeam3/monitoring-project.git
```
<br/>

### 2. npm install
```
cd monitoring-project
npm install
```
<br />

### 3. You have to make two files at server/config like this
#### 1. jwt.js
```
let jwtObj = {};

jwtObj.secret = "something"

module.exports = jwtObj
```

#### 2. security.json
```
{
    "username": "username",
    "password": "password"
}
```
<br />

### 4. Start Project: You have to open two terminals
```
cd front
npm start
```
```
cd server
npm start
```
<br />