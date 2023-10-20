import React, { useState, useEffect } from 'react';
import '../../Css/Admin.css';
import axios from "axios";
import { API_GET_ALL_LEAVETYPES, API_CREATE_LEAVETYPE, API_UPDATE_LEAVETYPE, API_DELETE_LEAVETYPE } from '../../../config';

const LeaveTypeView = (props) => {

    const [leaveTypes, setLeaveTypes] = useState([]);
    const [newLeaveType, setNewLeaveType] = useState('');
    const [maxDays, setMaxDays] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        getAllLeaveTypes();
    }, []);

    const clearInputs = () => {
        setNewLeaveType('');
        setMaxDays('');
    }

    const getAllLeaveTypes = () => {
        axios.get(API_GET_ALL_LEAVETYPES)
        .then(response => { setLeaveTypes(response.data); })
        .catch(error => {  console.error('Error getting all leave types:', error); });
    }

    const handleAdd = (e) => {
        e.preventDefault();
        //Check if both input have values
        if (newLeaveType && maxDays) {
            let confirmed = window.confirm("Are you sure you want to add this leave type?");
            if (confirmed) {
                axios.post(API_CREATE_LEAVETYPE, { name: newLeaveType, maxDays: parseInt(maxDays) })
                .then(response => { 
                    //Update all the types and then clear inputs
                    getAllLeaveTypes(); 
                    clearInputs(); 
                    setIsModalOpen(false); 
                })
                .catch(error => { console.error('Error adding leave type:', error); });
            }
        }
    }

    const handleDelete = (id) => {
        let confirmed = window.confirm("Are you sure you want to delete this leave type?");
        if (confirmed) {
            axios.delete(`${API_DELETE_LEAVETYPE}${id}`)
            .then(response => {getAllLeaveTypes(); })
            .catch(error => { console.error('Error deleting leave type:', error); });
        }
    }

    const handleEdit = (id) => {
        const leaveTypeToEdit = leaveTypes.find(lt => lt.id === id);
        if (leaveTypeToEdit) {
            setNewLeaveType(leaveTypeToEdit.name);
            setMaxDays(leaveTypeToEdit.maxDays);
            setEditingId(id);
            setIsModalOpen(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //Check if editingId is not null, incase "edit" the leave type
        //Otherwise go to the add method
        if (editingId) {
            let confirmed = window.confirm("Are you done with updating?");
            if (confirmed) {
                axios.put(API_UPDATE_LEAVETYPE, { id: editingId, name: newLeaveType, maxDays: parseInt(maxDays) })
                .then(response => {
                    getAllLeaveTypes();     //Update all leavetypes in the page
                    clearInputs();          
                    setIsModalOpen(false);  //Disable the modal / the lil page
                    setEditingId(null);     
                })
                .catch(error => { console.error('Error updating leave type:', error); });
            }
        } else {
            handleAdd(e);
        }
    };

    //Since no id is being parsed when "opening" the modal
    //in the html handleSubmit will open handleAdd method directly
    const handleOpenAddModal = () => {
        clearInputs();
        setEditingId(null); 
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        clearInputs();
        setEditingId(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>Leave Types</h1>
            <hr />
            <div className="LT-table-container">
                <button className="LT-add-button" onClick={handleOpenAddModal}> Add A New Leave Type </button>
                <table className="LT-Table">
                    <thead>
                        <tr>
                            <th>Leave Type</th>
                            <th>Maximum Days</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveTypes.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.maxDays}</td>
                                <td>
                                    <button className='edit-btn' onClick={() => handleEdit(item.id)}>Edit</button>
                                    <button className='deny-btn' onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <div className="LT-modal">
                    <div className="LT-modal-content">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input value={newLeaveType} 
                                    onChange={e => setNewLeaveType(e.target.value)} placeholder="Leave Type Name"/>
                                <input type="number" value={maxDays} 
                                    onChange={e => setMaxDays(e.target.value)} placeholder="Maximum Days"/>
                            </div>
                            <button className='LT-modal-content-accept-button' type="submit">{editingId ? "Update" : "Add"}</button>
                            <button className='LT-modal-content-close-button' type="button" onClick={closeModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LeaveTypeView;
