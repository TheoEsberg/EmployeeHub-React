import React, { useState, useEffect } from 'react';
import '../../Css/Admin.css';
import axios from "axios";
import { API_GET_ALL_EMPLOYEES } from '../../../config';

const EmployeeView = (props) => {

    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        axios.get(API_GET_ALL_EMPLOYEES)
        .then((response) => setEmployeeData(response.data))
        .catch((error) => console.log('ERROR: ' + error));
    }, []);

    return (
        <div>
            <h1>Employees</h1>
            <hr />
            <table className="LR-Table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th>Vacation Days</th>
                        <th>Is Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.vacationDays}</td>
                            <td>{item.isAdmin ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeView;
