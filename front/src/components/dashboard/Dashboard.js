import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import FirstChart from './FirstChart';
import SecondChart from './SecondChart';
import ThirdChart from './ThirdChart';
import '../../css/dashboard.css'
// const headerStyle = {
//     color : "#000066",
//     textAlign : 'left',
//     marginLeft : '30px',
//     fontFamily : 'hyundai harmony L'
// };

// const chartStyle = {
//     marginLeft : '100px',
//     marginRight : '100px',
//     padding: '0',
//     display: 'webkit-box',
//     display: 'moz-box',
//     display: 'ms-flexbox',
//     display: 'moz-flex',
//     display: 'webkit-flex',
//     display: 'flex',
//     justifyContent: 'space-between',
//     listStyle: 'none',
//     fontFamily : 'hyundai harmony L',
// };

// const tableStyle = {
//     display: "flex",
//     fontFamily : 'hyundai harmony L',
// }

class Dashboard extends Component {

    render() {
        return (
            <div>
                <h1 className="headerStyle">Dashboard</h1>
                <hr style={{color : '#000066', height : '1px', background : '#00287A', marginLeft : '20px', marginRight : '20px'}}/>
                <div className="chartStyle">
                    <div>
                        <h2>시간대별 요청 흐름</h2>
                        <FirstChart></FirstChart>
                    </div>
                    <div>
                        <h2>기능별 요청 빈도</h2> 
                        <SecondChart></SecondChart>
                    </div>
                    <div>
                        <h2>트랜잭션 성공률</h2>
                        <ThirdChart></ThirdChart>
                    </div>
                </div>
                <div className="tableStyle">
                    <div>
                        <h2>서버 현황</h2>
                    </div>
                    <div>
                        <h2>최근 실패 로그</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;