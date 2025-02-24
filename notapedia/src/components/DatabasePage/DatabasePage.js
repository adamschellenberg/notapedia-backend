import React, { useState, useEffect } from 'react';
import { useGetData } from '../../custom-hooks';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './DatabasePage.css';


export const DatabasePage = () => {

  const [notamonData, setNotamonData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [capturedNotamon, setCapturedNotamon] = useState(new Set());
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotamon = async () => {
      try {
        const result = await useGetData.useNotamon();
        setNotamonData(result);
      } catch (error) {
        console.error("Error fetching Notamon data", error);
      }
    };

    const fetchCaptured = async () => {
      if (!token) return;
      try {
        const response = await axios.get("http://localhost:5026/api/progress", {
          headers: { Authorization: `Bearer ${token}`},
        });
        setCapturedNotamon(new Set(response.data));
      } catch (error) {
        console.error ("Error fetching captured Notamon", error);
      }
    };

    fetchNotamon();
    fetchCaptured();
  }, [token]);

  const toggleCapture = async (notamonId) => {
    if (!token) return alert("You must be logged in to track Notamon!");

    const isCaptured = capturedNotamon.has(notamonId);
    const url = `http://localhost:5026/api/progress/${notamonId}`;

    try {
      if(isCaptured) {
        await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
        capturedNotamon.delete(notamonId);
      } else {
        await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });
        capturedNotamon.add(notamonId);
      }

      setCapturedNotamon(new Set(capturedNotamon));
    } catch (error) {
      console.error("Error updating capture status", error);
    }
  };

  const filteredNotamon = notamonData.filter((notamon) => 
    notamon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
        <div className="databaseBackground" />
        <Container>
          <h1 className="display-3 databaseHeader text-center">
            Notamon Database
          </h1>

          <Form className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search Notamon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>

            <table className='table table-light table-bordered table-sm mx-auto' id="database-table">
              <thead>
                <tr>
                  {token && <th>Captured</th>}
                  <th id="number-col">#</th>
                  <th>Notamon</th>
                  <th>Sprite</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredNotamon.map( (notamon) => {
                    let notamonNumber = notamon.number;
                    let notamonNumberPadded = notamonNumber.toString().padStart(3, "0");
                    let notamonName = notamon.name;
                    let notamonType = notamon.nexomonType;
                    let notamonTypeImagePath = "db/extinction/images/elements/" + notamonType.toLowerCase() + ".png";
                    let notamonImagePath = "db/extinction/images/notamon/small/" + notamonNumberPadded + "-" + notamonName.toLowerCase() + ".png";

                    return (
                      <tr key={notamon.nexomonId}>
                        {token && (
                          <td>
                            <img 
                              src={require("../../assets/images/notatrap.png")}
                              alt="Capture Icon"
                              className={`capture-icon ${capturedNotamon.has(notamon.nexomonId) ? "captured" : "not-captured"}`}
                              onClick={() => toggleCapture(notamon.nexomonId)}
                              style={{ cursor: "pointer", width: "40px", height: "40px"}}
                              />
                          </td>
                        )}
                        <td>{notamonNumberPadded}</td>
                        <td>{notamonName}</td>
                        <td>
                          <img className="notamon-sprite-img-db" src={notamonImagePath} alt={notamonName} />
                        </td>
                        <td>
                          {notamonType} <br />
                          <img className="element-img" src={notamonTypeImagePath} alt={notamonType} />
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
        </Container>
    </div>
  )
}
