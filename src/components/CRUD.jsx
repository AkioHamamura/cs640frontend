//This component is used to create, read, update and delete the data from the database.
//When making a CRUD operation, will fetch the JWT token from the cookies and send it as a header in the fetch request along with the proper api endpoint.
//Will return the data from the database and display it in a table format.
import Cookies from "js-cookie";
import {useState} from "react";
const endpoint = 'http://3.147.112.156';
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



export default function DbQuery() {
    const [result, setResult] = useState([]);
    return (
        <div>
            {result.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        {Object.keys(result[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {result.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, i) => (
                                <td key={i}>{(value)}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>


    );


}