import '../Css/Admin.css';
import React, { useEffect, useState } from 'react';

import RequestView from './SubViews/RequestsView.jsx';
import EmployeeView from './SubViews/EmployeeView';

const AdminView = (props) => {

    console.log(props);

    //Default view
    const [currentContent, setCurrentContent] = useState('approve-requests');

    const switchContent = (page) => {
        switch (page) {
            case 'approve-requests':
                setCurrentContent('approve-requests');
                break;
            case 'all-employees':
                setCurrentContent('all-employees');
                break;
            default:
                //If something happens go back to default view (maybe do something else later)
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
                    <button onClick={() => switchContent('all-employees')}> <i class="bi bi-person-gear"></i> Employees</button>
                    <button onClick={() => switchContent('approve-requests')}> TO BE MADE</button>
                </ul>
            </div>
            <main className='content'>
                {currentContent === 'approve-requests' && <RequestView props={props.props} />}
                {currentContent === 'all-employees' && <EmployeeView props={props.props} />}
            </main>
        </div>
    );

}

export default AdminView;
