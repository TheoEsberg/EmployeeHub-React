import React, { useState, useEffect } from 'react';
import '../../Css/Admin.css';
import axios from "axios";
import { API_GET_ALL_EMPLOYEES } from '../../../config';

const EmployeeView = (props) => {

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
            <h1>Employees</h1>
            <hr />
            {isLoading ? <h2>Loading...</h2> : ( 
                <table className="LR-Table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.isAdmin ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EmployeeView;
