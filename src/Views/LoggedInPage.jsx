import React, { useEffect, useState } from 'react';
import { API_LOGIN } from '../../config.js';
import '../Css/loggedIn.css';

import MyLeaveView from './MyLeaveView';
import ApplyLeaveView from './ApplyLeaveView';
import AdminView from './AdminView.jsx'
import LoginForm from './LoginForm.jsx';
import { useNavigate } from 'react-router-dom';

const LoggedInPage = ( props ) => {

    console.log(props);

    //Admin view hide/nothide
    const[showAdmin, setShowAdmin] = useState(false)

    //Default view
    const [currentContent, setCurrentContent] = useState('my-leave');

    const navigate = useNavigate(); 
    
    const switchContent = (page) => {
        switch (page) {
            case 'my-leave':
                setCurrentContent('my-leave');
                break;
            case 'apply-leave':
                setCurrentContent('apply-leave');
                break;
            case 'admin':
                setCurrentContent('admin')
                break;
            default:
                //If something happens go back to default view (maybe do something else later)
                setCurrentContent('my-leave');
                console.log("An error occoured in method : SwitchContent");
                break;
        }
    };

    const confirmLogout = () => {
        const userWantsToLogout = window.confirm("Are you sure you want to logout?");
        if (userWantsToLogout) {
            console.log("Logging out!");
            navigate('/')
        } else {
            console.log("Do not logout!");
        }
    };
    
    useEffect(() => { 
        if(props.result.isAdmin){
            setShowAdmin(true);
        }
    }, []) 
    
    return (
        <div className='container'>
            <div className='navbar'>
                <div className="email-display">
                    <p><i class="bi bi-person-fill"></i> {props.result.email}</p>
                </div>
                <ul className="nav-links">
                    <button onClick={() => confirmLogout()}> <i class="bi bi-box-arrow-right"></i> Logout</button>
                    <button onClick={() => switchContent('my-leave')}> <i class="bi bi-folder2-open"></i> My Leave</button>
                    <button onClick={() => switchContent('apply-leave')}> <i class="bi bi-pen"></i> Apply for Leave</button>
                    {showAdmin ? <button onClick={()=>switchContent('admin')}><i class="bi bi-gear"></i> Admin Page</button> : null}
                </ul>
            </div>
            <main className='content'>
                {currentContent === 'logout' && <LogoutView />}
                {currentContent === 'my-leave' && <MyLeaveView props={props.result} />}
                {currentContent === 'apply-leave' && <ApplyLeaveView props={props.result} />}
                {currentContent === 'admin' && <AdminView props={props.result} />}
            </main>
        </div>
    );

};

export default LoggedInPage;