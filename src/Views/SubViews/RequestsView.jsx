import React, { useState, useEffect } from 'react';
import '../../Css/Admin.css';
import { API_GET_ALL_EMPLOYEES, API_GET_ALL_LEAVEREQUESTS } from '../../../config';

const RequestView = (props) => {

    console.log(props.props)
    
    const [leaveData, setLeaveData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    const [totalRequests, setTotalRequests] = useState(0);
    const [pendingRequests, setPendingRequests] = useState(0);
    const [acceptedRequests, setAcceptedRequests] = useState(0);
    const [deniedRequests, setDeniedRequests] = useState(0);

    //Filter type (leaveType), default; total requests
    const [filterType, setFilterType] = useState('total');

    useEffect(() => {
        //Get all leaverequests
        fetch(API_GET_ALL_LEAVEREQUESTS)
        .then((response) => response.json())
        .then((data) => {
            setLeaveData(data);
            setTotalRequests(data.length);
            setPendingRequests(data.filter(request => request.status === "pending").length);
            setAcceptedRequests(data.filter(request => request.status === "accepted").length);
            setDeniedRequests(data.filter(request => request.status === "denied").length);
        })
        .catch((error) => console.log('ERROR: ' + error));
        //Get all employees
        fetch(API_GET_ALL_EMPLOYEES)
        .then((response) => response.json())
        .then((employeeData) => {
            setEmployeeData(employeeData);
            setIsLoading(false);
        })
        .catch((error) => console.log('ERROR: ' + error));
    }, []);

    const filteredData = () => {
        switch(filterType) {
            case 'pending': 
                return leaveData.filter(request => request.status === "pending");
            case 'accepted': 
                return leaveData.filter(request => request.status === "accepted");
            case 'denied': 
                return leaveData.filter(request => request.status === "denied");
            default: 
                return leaveData;
        }
    };

    return (
        <div>
            <h1>Leave Requests</h1>
            <hr />
            <div className="request-counts">
                <button onClick={() => setFilterType('total')}> {totalRequests}<br/>All Requests</button>
                <button onClick={() => setFilterType('pending')}> {pendingRequests}<br/>Pending Requests</button>
                <button onClick={() => setFilterType('accepted')}> {acceptedRequests}<br/>Approved Requests</button>
                <button onClick={() => setFilterType('denied')}> {deniedRequests}<br/>Rejected Requests</button>
            </div>
            {isLoading ? <h2>Loading...</h2> : (
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
                        {filteredData().map((item) => {
                            //Match employee id and leaverequest id from filterData (leaveData)
                            const employee = employeeData.find(employee => employee.id === item.employeeId);
                            return (
                                <tr key={item.id}>
                                    <td>{employee ? employee.name : 'Employee Not Found'}</td>
                                    <td>{item.leaveTypeId}</td>
                                    <td>{new Date(item.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(item.endDate).toLocaleDateString()}</td>
                                    <td><input type="text" name="msg"/></td>
                                    <td>
                                        <button className="accept-btn">Accept</button>
                                        <button className="deny-btn">Deny</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default RequestView;