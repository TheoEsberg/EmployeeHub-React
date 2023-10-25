import React, { useState, useEffect } from 'react';
import '../Css/MyLeave.css';
import axios from 'axios';
import { API_GET_EMPLOYEE_LEAVEREQUESTS, API_GET_ALL_LEAVETYPES, API_DELETE_LEAVEREQUEST, API_GET_ALL_USEDLEAVEDAYS_EMPLOYEE} from '../../config.js';

const MyLeaveView = (props) => {

    const [leaveRecords, setLeaveRecords] = useState([]);
    const [usedLeaveDays, setUsedLeaveDays] = useState([])
    const [leaveTypes, setLeaveTypes] = useState([]);

    useEffect(() => {
        axios.get(`${API_GET_EMPLOYEE_LEAVEREQUESTS}${props.props.id}`)
        .then((result) => {
            console.log(result);
            setLeaveRecords(result.data);
        })
        .catch((error) => {
            console.error("Error fetching leave records:", error);
        });

        axios.get(`${API_GET_ALL_USEDLEAVEDAYS_EMPLOYEE}${props.props.id}`)
        .then((result_uld)=>{
            setUsedLeaveDays(result_uld.data)
        })
        .catch((error)=>{
            console.error("Error fetching UsedLeaveDays:",error)
        })

        axios.get(`${API_GET_ALL_LEAVETYPES}`)
        .then((result_lt) => {
            console.log("LEAVE TYPES:", result_lt.data);
            setLeaveTypes(result_lt.data);
        })
        .catch((error) => {
            console.error("Error fetching leave types:", error);
        });
    }, []);

    const getLeaveTypeName = (leaveTypeId) => {
        const leaveTypeObj = leaveTypes.find(leaveType => leaveType.id === leaveTypeId);
        return leaveTypeObj ? leaveTypeObj.name : "N/A";
    }

    const deleteRequest = (recordId) => {
        let confirmed = window.confirm("Are you sure you want to delete this leave request?");
        if (confirmed) {
            axios.delete(`${API_DELETE_LEAVEREQUEST}${recordId}`)
            .then((response) => {
                console.log(response.data.message);
                //Filter out the certain record
                const updatedRecords = leaveRecords.filter(record => record.id !== recordId);
                setLeaveRecords(updatedRecords);
            })
            .catch((error) => {
                console.error("Error deleting leave record:", error);
            });
        }
    }
    
    return (
        <div>
            <div>
                <h1>My Leave Allocation</h1>
                <hr />
                <table className='LR-Table'>
                    <thead>
                        <tr>
                            <th>Leave Type</th>
                            <th>Days left</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usedLeaveDays.map((item)=>(
                            <tr key={item.id}>
                                <td>{getLeaveTypeName(item.leaveTypeId)}</td>
                                <td>{item.days}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <hr />
            <div>
                <h1>My Leave Records</h1>
                <hr />
                <table className="LR-Table">
                    <thead>
                        <tr>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Date Requested</th>
                            <th>Approval State</th>
                            <th>Cancel Request</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveRecords.map((item) => (
                            <tr key={item.id}>
                                <td>{getLeaveTypeName(item.leaveTypeId)}</td>
                                <td>{new Date(item.startDate).toLocaleDateString()}</td>
                                <td>{new Date(item.endDate).toLocaleDateString()}</td>
                                <td>{new Date(item.requestDate).toLocaleDateString()}</td>
                                <td>
                                    {item.pending === -1 ? 'Denied' : item.pending === 0 ? 'Pending' : 'Approved'}
                                </td>
                                <td><button onClick={() => deleteRequest(item.id)} className='button-my-leave'>Cancel</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyLeaveView;
