import React, { useState, useEffect } from 'react';
import '../../Css/Admin.css';
import axios from "axios";
import { API_GET_ALL_EMPLOYEES, API_GET_ALL_LEAVEREQUESTS, API_SEND_EMAIL, API_UPDATE_LEAVEREQUEST } from '../../../config';

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
        getLeaveRequests();
        getAllEmployees();
    }, []);

    const getLeaveRequests = () => {
        fetch(API_GET_ALL_LEAVEREQUESTS)
        .then((response) => response.json())
        .then((data) => {
            setLeaveData(data);
            //Set amount of requests for total, pending etc
            setTotalRequests(data.length);
            setPendingRequests(data.filter(request => request.pending === 0).length);
            setAcceptedRequests(data.filter(request => request.pending === 1).length);
            setDeniedRequests(data.filter(request => request.pending === -1).length);
        })
        .catch((error) => console.log('ERROR: ' + error));
    }

    const getAllEmployees = () => {
        fetch(API_GET_ALL_EMPLOYEES)
        .then((response) => response.json())
        .then((employeeData) => {
            setEmployeeData(employeeData);
            setIsLoading(false);
        })
        .catch((error) => console.log('ERROR: ' + error));
    }

    const handlePendingState = (itemId, state, message, inputElem, email) => {
        axios.put(API_UPDATE_LEAVEREQUEST, { id: itemId, pending: state, responseMessage: message })
        .then((response) => {
            console.log(response.data);
            console.log("EMail: ", email);
            sendEmail(message); 
            if (inputElem) { inputElem.value = ''; } //Clear input
            getLeaveRequests(); //Update display
        })
        .catch(error => console.log(error));
    }

    //Not yet implemented
    const sendEmail = (to, subject, message) => {
        message = message || "Ask Admin";

        const emailData = {
            to: to,
            subject: subject,
            body: message
        };

        axios.post(API_SEND_EMAIL, emailData)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const filteredData = () => {
        switch(filterType) {
            case 'pending': 
                return leaveData.filter(request => request.pending === 0);
            case 'accepted': 
                return leaveData.filter(request => request.pending === 1);
            case 'denied': 
                return leaveData.filter(request => request.pending === -1);
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
                <button onClick={() => setFilterType('denied')}> {deniedRequests}<br/>Denied Requests</button>
            </div>
            {isLoading ? <h2>Loading...</h2> : (
                <table className="LR-Table">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Leave Type ID</th>
                            <th>Status</th>
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
                                    <td>{item.pending === 0 ? "Pending" : (item.pending === 1 ? "Approved" : "Denied")}</td>
                                    <td>{new Date(item.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(item.endDate).toLocaleDateString()}</td>
                                    <td><input type="text" name={`msg-${item.id}`}/></td>
                                    <td>
                                        {/*the id of the itemblock, pending state of it (-1 Denied, 0 Pending, 1 Approved), message in input*/}
                                        <button className="accept-btn" 
                                            onClick={() => {
                                                const inputElem = document.querySelector(`input[name="msg-${item.id}"]`);
                                                const message = inputElem ? inputElem.value : "";
                                                sendEmail(employee.email, "Approval Notification", message);
                                                handlePendingState(item.id, 1, message, inputElem);
                                            }}>
                                            Accept
                                        </button>
                                        <button className="deny-btn" 
                                            onClick={() => {
                                                const inputElem = document.querySelector(`input[name="msg-${item.id}"]`);
                                                const message = inputElem ? inputElem.value : "";
                                                sendEmail(employee.email, "Denial Notification", message);
                                                handlePendingState(item.id, -1, message, inputElem);
                                            }}>
                                            Deny
                                        </button>
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