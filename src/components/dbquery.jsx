import Cookies from "js-cookie";
import { useState } from 'react';

/*export default function DbQuery() {
  const [query, setQuery] = useState('');
  const [result] = useState([]);

  const storeToken = (token) => {
    Cookies.set('jwtToken', token, { expires: 7 });
  };

  const getToken = () => {
    return Cookies.get('jwtToken');
  };

  const login = async (email, password) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (!email || !password) {
      alert('Email and password are required');
      return;
    }
    const raw = JSON.stringify({
      email,
      password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://3.147.112.156:82/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          storeToken(result.token); // Assuming the token is in result.token
        })
        .catch((error) => console.error(error));
  };

  const sqlquery = async () => {
    const token = getToken();
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
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
      <div>
      <textarea
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter your query here..."
      />
        <button onClick={sqlquery}>Submit</button>
        <button onClick={login}>Login</button>
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
                    {Object.values(row).map((value  , i) => (
                        <td key={i}>{(value)}</td>
                    ))}
                  </tr>
              ))}
              </tbody>
            </table>
        )}
      </div>
  );
}*/