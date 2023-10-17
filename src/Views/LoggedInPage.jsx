import React, { useEffect, useState } from 'react';
const URLBase = "https://localhost:7154"

const LoggedInPage = ({ email, password }) => {
    const [data, setData] = useState([]);
    const loginData = {
        Email: email,
        Password: password 
    };

    useEffect(() => {
        // This will be our call to the API where we get the Employee back if the email and corresponding password is matching
        fetch(URLBase + '/api/Login', {
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

    return (
        <div>
            <h1>Welcome to the Logged In Page</h1>
            <br /><hr /><br />
            <p>ID: {data.id}</p>
            <p>Name: {data.name}</p>
            <p>Email: {data.email}</p>
            <p>Vacation Days: {data.vacationDays}</p>
            <p>Is Admin: {data.isAdmin ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default LoggedInPage;