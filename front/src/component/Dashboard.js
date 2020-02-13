import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import FirstChart from './FirstChart';
import SecondChart from './SecondChart';
import ThirdChart from './ThirdChart';

const chartStyle = {
    display : "flex",
};

const headerStyle = {
    color : "#00287A",
    textAlign : 'left',
    marginLeft : '30px'
};


class Dashboard extends Component {

    render() {
        return (
            <div>
                <h1 style={headerStyle}>Dashboard</h1>
                <hr style={{color : '#00287A', height : '1.5px', background : '#00287A'}}/>
                <div style={chartStyle}>
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
                <div style={chartStyle}>
                    <h2>서버 현황</h2>
                    <h2>최근 실패 로그</h2>
                </div>
            </div>
        );
    }
}

export default Dashboard;