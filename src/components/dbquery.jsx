import React, { useState } from 'react';
export default function DbQuery() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);


  const login = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": "hello@world.com",
      "password_hash": "123"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://3.147.112.156:82/login", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
  }

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = async () => {
    try {
      const response = await fetch(`http://3.147.112.156:82/`);
      const data = await response.json();
      setResult(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
      <div>
      <textarea
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter your query here..."
      />
        <button onClick={()=>login()}   >Submit</button>
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
                        <td key={i}>{value}</td>
                    ))}
                  </tr>
              ))}
              </tbody>
            </table>
        )}
      </div>
  );
}