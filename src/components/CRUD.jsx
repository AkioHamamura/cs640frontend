//This component is used to create, read, update and delete the data from the database.
//When making a CRUD operation, will fetch the JWT token from the cookies and send it as a header in the fetch request along with the proper api endpoint.
//Will return the data from the database and display it in a table format.
import Cookies from "js-cookie";
import {useState} from "react";

const getToken = () => {
    return Cookies.get('jwtToken');
};

const getUsers = async () => {
    const token = getToken();
    let result;
    if (!token) {
        console.error('No token found');
        return;
    }

    fetch('http://3.147.112.156:82/api/Users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => result = (data))
        .catch(error => console.error('Error:', error));
    return result;
};

const getProperties = async () => {
    const token = getToken();
    let result;
    if (!token) {
        console.error('No token found');
        return;
    }

    fetch('http://3.147.112.156:82/api/Properties', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => result = (data))
        .catch(error => console.error('Error:', error));
    return result;
};

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