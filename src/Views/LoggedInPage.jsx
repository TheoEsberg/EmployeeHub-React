import React, { useEffect, useState } from 'react';
import { API_LOGIN } from '../../config.js';
import '../Css/loggedIn.css';

import MyLeaveView from './MyLeaveView';
import ApplyLeaveView from './ApplyLeaveView';
import LogoutView from './LogoutView.jsx';

const LoggedInPage = ({ email, password }) => {
    
    const [data, setData] = useState([]);
    const loginData = {
        Email: email,
        Password: password 
    };

    useEffect(() => {
        //This will be our call to the API where we get the Employee back if the email and corresponding password is matching
        fetch(API_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error: ", error));
    }, [email, password]);

    //Default view
    const [currentContent, setCurrentContent] = useState('my-leave');
    
    const switchContent = (page) => {
        switch (page) {
            case 'my-leave':
                setCurrentContent('my-leave');
                break;
            case 'apply-leave':
                setCurrentContent('apply-leave');
                break;
            case 'logout':
                setCurrentContent('logout');
                break;
            default:
                //If something happens go back to default view (maybe do something else later)
                setCurrentContent('my-leave');
                console.log("An error occoured in method : SwitchContent");
                break;
        }
    };

    // Data Structure
    // ID: {data.id}
    // Name: {data.name}
    // Email: {data.email}
    // Vacation Days: {data.vacationDays}
    // Is Admin: {data.isAdmin ? 'Yes' : 'No'}
    
    return (
        <div className='container'>
            <div className='navbar'>
                <div className="email-display">
                    <p>{data.email}</p>
                </div>
                <ul className="nav-links">
                    <button onClick={() => switchContent('logout')}>Logout</button>
                    <button onClick={() => switchContent('my-leave')}>My Leave</button>
                    <button onClick={() => switchContent('apply-leave')}>Apply for Leave</button>
                </ul>
            </div>
            <main className='content'>
                {currentContent === 'logout' && <LogoutView />}
                {currentContent === 'my-leave' && <MyLeaveView />}
                {currentContent === 'apply-leave' && <ApplyLeaveView />}
            </main>
        </div>
    );

};

export default LoggedInPage;