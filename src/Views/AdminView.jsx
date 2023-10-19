import '../Css/Admin.css';
import React, { useEffect, useState } from 'react';

import RequestView from './SubViews/RequestsView.jsx';

const AdminView = (props) => {

    console.log(props);

    //Default view
    const [currentContent, setCurrentContent] = useState('approve-requests');

    const switchContent = (page) => {
        switch (page) {
            case 'approve-requests':
                setCurrentContent('approve-requests');
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
                    <button onClick={() => switchContent('approve-requests')}> TO BE MADE</button>
                    <button onClick={() => switchContent('approve-requests')}> TO BE MADE</button>
                </ul>
            </div>
            <main className='content'>
                {currentContent === 'approve-requests' && <RequestView props={props.props} />}
            </main>
        </div>
    );

}

export default AdminView;
