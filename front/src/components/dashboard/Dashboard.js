import React, { Component } from 'react';

import FirstChart from './FirstChart';
import SecondChart from './SecondChart';
import ThirdChart from './ThirdChart';

import '../../css/dashboard.css'
import '../../../node_modules/react-vis/dist/style.css';

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
                        {/* <search></search> */}
                    </div>
                    <div>
                        <h2>최근 실패 로그</h2>
                        {/* <search></search> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;