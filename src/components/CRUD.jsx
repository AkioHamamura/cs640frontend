//This component is used to create, read, update and delete the data from the database.
//When making a CRUD operation, will fetch the JWT token from the cookies and send it as a header in the fetch request along with the proper api endpoint.
//Will return the data from the database and display it in a table format.
import Cookies from "js-cookie";
import {useState} from "react";
const endpoint = 'https://amplify.cs640.icu';
export const getToken = () => {
    return Cookies.get('jwtToken');
};
/*--------------------------Select------------------------------------------*/
export const getPackages = async () => {
    const token = getToken();
    let result;
    if (!token) {
        console.error('No token found');
        return;
    }

    fetch(`${endpoint}/api/Packages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => result = (data))
        .catch(error => console.error('Error:', error));
    console.log(result);
    //return result;
};

export const getPayments = async () => {
    const token = getToken();
    if (!token) {
        console.error('No token found');
        return;
    }
    try {
        const response = await fetch(`${endpoint}/api/Payments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {console.error('Error:', error);}
}

export const getUsers = async () => {
    const token = getToken();
    let result;
    if (!token) {
        console.error('No token found');
        return;
    }

    fetch(`${endpoint}/api/Users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => result = (data))
        .catch(error => console.error('Error:', error));
    console.log(result);
    return result;
};

export const getProperties = async () => {
    const token = getToken();
    if (!token) {
        console.error('No token found');
        return;
    }

    try {
        const response = await fetch(`${endpoint}/api/Properties`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {console.error('Error:', error);}
};
export const getMaintenanceRequests = async () =>{
    const token = getToken();
    if (!token) {
        console.error('No token found');
        return;
    }
    try {
        const response = await fetch(`${endpoint}/api/MaintenanceRequests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    }catch(e){console.error('Error:', e);}

}
export const getResidents = async () => {
    const token = getToken();
    if (!token) {
        console.error('No token found');
        return;
    }
    try{
        const response = await fetch(`${endpoint}/api/adv/Residents`,{
           method: 'GET',
            headers:{
               'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data);
        return data;

    }catch (e){
        console.error('Error:', e);
    }


}

/*--------------------------Select------------------------------------------*/

/*--------------------------Update------------------------------------------*/
//Edit property
export const updateProperty = async (data) => {
    console.log(data);
    const token = getToken();
    if (!token){
        console.error('No token Found, Please login');
    }
    try{
        const response = await fetch(`${endpoint}/api/update/Properties`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        //data should have property_id, name, address, city, state, zip, phone
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log(result);
        return result;
    }catch(e){console.error('Error:', e);}
};

//Edit maintenance status
export const updateMaintenanceRequest = async (data) =>{
    const token = getToken();
    if (!token){
        console.error('No token Found, Please login');
    }
    try{
        const response = await fetch(`${endpoint}/api/update/MaintenanceRequests`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            //data should have request_id, priority, status, resolution_notes
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log(result);
        return result;
    }catch(e){console.error('Error:', e);}
};

//Update payment status
export const updatePaymentStatus = async (data) =>{
    const token = getToken();
    if (!token){
        console.error('No token Found, Please login');
    }
    try{
        const response = await fetch(`${endpoint}/api/update/Payments`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            //data should have payment_id, status
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log(result);
        return result;
    }catch(e){console.error('Error:', e);}

};