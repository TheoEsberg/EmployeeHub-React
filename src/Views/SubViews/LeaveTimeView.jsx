import React, { useState, useEffect } from 'react';
import '../../Css/Admin.css';
import axios from "axios";
import { API_GET_ALL_LEAVETYPES, API_GET_ALL_LEAVEREQUESTS } from '../../../config';

const LeaveTimeView = () => {

    const [leaveData, setLeaveData] = useState([]);
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [selectedLeaveType, setSelectedLeaveType] = useState("all");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        fetchLeaveRequests();
        fetchLeaveTypes();
    }, []);

    const fetchLeaveRequests = async () => {
        axios.get(API_GET_ALL_LEAVEREQUESTS)
        .then(response => { setLeaveData(response.data); })
        .catch(error => { console.error('Error fetching leave requests:', error); });
    }

    const fetchLeaveTypes = async () => {
        axios.get(API_GET_ALL_LEAVETYPES)
        .then(response => { setLeaveTypes(response.data); })
        .catch(error => { console.error('Error getting all leave types:', error); });
    }
    
    //Based on what leavetype it'll check the allocated leave time
    //type & leave are just given lambda variables, could be x or y for example
    //only the leaveTypes & leaveData actually matter
    const totalsForEachType = leaveTypes.map(type => {
        const total = leaveData.filter(leave => leave.leaveTypeId === type.id && leave.pending === 1 && 
            new Date(leave.startDate) >= startDate && new Date(leave.endDate) <= endDate
        )
        .reduce((total, currentLeave) => {

            const start = new Date(currentLeave.startDate);
            const end = new Date(currentLeave.endDate);
            const millisecondsInADay = 1000 * 60 * 60 * 24;

            //Get the date(s) between the given two dates
            const differenceInDays = Math.floor((end - start) / millisecondsInADay) + 1;
        
            return total + differenceInDays;
        }, 0);

        return { typeId: type.id, total, typeName: type.name};
    });

    //Just the total amount of leavetime allocated
    const totalAcceptedLeaveTimeForAll = totalsForEachType.reduce((sum, typeTotal) => sum + typeTotal.total, 0);
    
    const saveToFile = () => {
        console.log("saved.");
    };

    return (
        <div className="leave-time-container">
            <h1>Leave Time</h1>
            <hr />
            <div className="date-picker-container">
                <h4>Choose two dates to check the allocated leave time between them.</h4>
                <label>
                    <p>Start Date</p>
                    <input type="date" value={startDate.toISOString().substr(0, 10)} onChange={(e) => setStartDate(new Date(e.target.value))} />
                </label>
                <label>
                    <p>End Date</p>
                    <input type="date" value={endDate.toISOString().substr(0, 10)} onChange={(e) => setEndDate(new Date(e.target.value))} />
                </label>
            </div>
            <div className="leave-action-container">
                <select value={selectedLeaveType} onChange={(e) => setSelectedLeaveType(e.target.value)}>
                    <option value="all">All</option>
                    {leaveTypes.map((type, index) => (
                        <option key={index} value={type.id}>{type.name}</option>
                    ))}
                </select>
                <button onClick={saveToFile}>Save to File</button>
            </div>
            <div className="leave-days">
                {selectedLeaveType === 'all' ? 
                    <>
                        {totalAcceptedLeaveTimeForAll} days of accepted leave for all types.
                        {totalsForEachType.map((typeTotal) => (
                            <div key={typeTotal.typeId}> {typeTotal.total} days of accepted leave for {typeTotal.typeName}.</div>
                        ))}
                    </> : 
                    <div>
                        {totalsForEachType.find(type => type.typeId === parseInt(selectedLeaveType, 10))?.total || 0} 
                        &nbsp;days of accepted leave for&nbsp; {/* 	&nbsp; = nonbreaking space */}
                        {leaveTypes.find(type => type.id === parseInt(selectedLeaveType, 10))?.name || 'Unknown Type'}
                    </div>
                }
            </div>
        </div>
    );
}

export default LeaveTimeView;
