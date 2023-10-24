import React, { useState, useEffect } from 'react';
import '../../Css/Admin.css';
import axios from "axios";
import { API_GET_ALL_EMPLOYEES } from '../../../config';

const LeaveTimeView = (props) => {

    const [employeeData, setEmployeeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        axios.get(API_GET_ALL_EMPLOYEES)
        .then((response) => {
            setEmployeeData(response.data);
            setIsLoading(false);  
        })
        .catch((error) => {
            console.log('ERROR: ' + error);
            setIsLoading(false);  
        });
    }, []);

    return (
        <div>
            <h1>Leave Time</h1>
            <hr />
            <p>Data</p>
        </div>
    );
}

export default LeaveTimeView;
