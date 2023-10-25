import React, { Fragment, useEffect, useState } from 'react';
import { API_CREATE_LEAVEREQUEST, API_GET_ALL_LEAVETYPES } from '../../config';
import '../Css/ApplyLeave.css';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ApplyLeaveView = (props) => {

    console.log(props);
    const [LeaveTypes, setLeaveTypes] = useState([]);
    const[LeaveTypeId, setLeaveTypeId]=useState("")
    const[StartDate, setStartDate]=useState("")
    const[EndDate, setEndDate]=useState("")

    const [showError, setShowError] = useState(false)

    useEffect(() => {
        axios.get(API_GET_ALL_LEAVETYPES)
            .then((result) => {
                setLeaveTypes(result.data);
            })
            .catch((error) => {
                console.log('Error fetching LeaveTypes: ', error)
            });
    }, []);

    const handleAdd=()=>{
        const data={
            "employeeId":props.props.id,
            "leaveTypeId":LeaveTypeId,
            "startDate":StartDate,
            "endDate":EndDate,
        }
        axios.post(API_CREATE_LEAVEREQUEST,data)
        .then((result)=>{
            console.log(result);
            window.alert("A new LeaveRequest was Created")
        })
        .catch((error)=>{
            setShowError(true)
            console.log("An error with adding a LeaveRequest")
        })
    }

    return (
        <Fragment>
            <h1>Apply for a Leave Request</h1>
            <hr />
            <Container>
                <Row>
                    <Col>
                        <select className='form-control' value={LeaveTypeId} onChange={(e) => setLeaveTypeId(e.target.value)}>
                            <option value="">Select LeaveType</option>
                            {LeaveTypes.map((leaveType) => (
                                <option key={leaveType.id} value={leaveType.id}>
                                    {leaveType.name}
                                </option>
                            ))}
                        </select>
                    </Col>
                    {/* <Col>
                        <input type="number" className="form-control" placeholder="Enter LeaveTypeID" value={LeaveTypeId} onChange={(x)=> setLeaveTypeId(x.target.value)}/>
                    </Col> */}
                    <Col>
                        <input type="date" className="form-control" placeholder="Enter Start Date" value={StartDate} onChange={(x)=> setStartDate(x.target.value)}/>
                    </Col>
                    <Col>
                        <input type="date" className="form-control" placeholder="Enter End Date" value={EndDate} onChange={(x)=> setEndDate(x.target.value)}/>
                    </Col>
                    {showError ? <p className="ErrorMessage">Cant put in more days than you have avaible</p> : null}
                    <br></br>
                    <Col>
                        <button className='btn btn-primary' onClick={()=>handleAdd()}>Submit Leave Request</button>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default ApplyLeaveView;
