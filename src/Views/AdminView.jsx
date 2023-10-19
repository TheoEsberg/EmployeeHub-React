import '../Css/Admin.css';
import axios from "axios";
import { API_GET_ALL_EMPLOYEES, API_GET_ALL_LEAVEREQUESTS } from '../../config';
import React, { useEffect, useState } from 'react';

const ApplyLeaveView = (props) => {

    console.log(props);
    const [leaveData, setLeaveData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);


    useEffect(() => {
        fetch(API_GET_ALL_LEAVEREQUESTS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((leaveData) => setLeaveData(leaveData))
        .catch((error) => console.log('ERROR: ' + error))
    }, []);

    useEffect(() => {
        fetch(API_GET_ALL_EMPLOYEES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((employeeData) => setEmployeeData(employeeData))
        .catch((error) => console.log('ERROR: ' + error))
    }, []);

    const logData = () => {
        console.log(leaveData);
        console.log(employeeData);
    }

    return (
        <div>
            <h1>Admin view</h1>
            {/* <button onClick={logData}>API GET DATA YAAAAYY!</button> */}
            <hr />
            <table className="LR-Table">
            <thead>
                <tr>
                    <th>Employee Name</th>
                    <th>Leave Type ID</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Message</th>
                    <th>Accept / Deny</th>
                </tr>
            </thead>
            <tbody>
                {leaveData.map((item) => {
                // Find the employee by employeeId
                const employee = employeeData.find(employee => employee.id === item.employeeId);
                return (
                    <tr key={item.id}>
                        <td>{employee ? employee.name : 'Employee Not Found'}</td>
                        <td>{item.leaveTypeId}</td>
                        <td>{item.startDate}</td>
                        <td>{item.endDate}</td>
                        <td><input type="text" name="msg"/></td>
                        <td>
                            <button class="accept-btn">Accept</button>
                            <button class="deny-btn">Deny</button>
                        </td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>
    );
}

export default ApplyLeaveView;
