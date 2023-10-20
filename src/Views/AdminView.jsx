import '../Css/Admin.css';
import React, { useEffect, useState } from 'react';

import RequestView from './SubViews/RequestsView.jsx';
import EmployeeView from './SubViews/EmployeeView';
import LeaveTypeView from './SubViews/LeaveTypeView';

const AdminView = (props) => {

    console.log(props);

    //Default view
    const [currentContent, setCurrentContent] = useState('approve-requests');

    const switchContent = (page) => {
        switch (page) {
            case 'approve-requests':
                setCurrentContent('approve-requests');
                break;
            case 'employees':
                setCurrentContent('employees');
                break;
            case 'leavetype':
                setCurrentContent('leavetype');
                break;
            default:
                setCurrentContent('approve-requests');
                console.log("An error occoured in method : SwitchContent");
                break;
        }
    };

    return (
        //CSS from LoggedIn.css (somehow) css vodoo magic
        <div className='container'>
            <div className='navbar-sub'>
                <ul className="nav-links">
                    <button onClick={() => switchContent('approve-requests')}> <i class="bi bi-envelope-paper"></i> Requests</button>
                    <button onClick={() => switchContent('employees')}> <i class="bi bi-person-gear"></i> Employees</button>
                    <button onClick={() => switchContent('leavetype')}> <i class="bi bi-list-ul"></i> Leave Types</button>
                </ul>
            </div>
            <main className='content'>
                {currentContent === 'approve-requests' && <RequestView props={props.props} />}
                {currentContent === 'employees' && <EmployeeView props={props.props} />}
                {currentContent === 'leavetype' && <LeaveTypeView props={props.props} />}
            </main>
        </div>
    );

}

export default AdminView;
