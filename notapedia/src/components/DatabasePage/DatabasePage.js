import React, { useState, useEffect } from 'react';
import { useGetData, useFetchProgress } from '../../custom-hooks';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './DatabasePage.css';


export const DatabasePage = ({ onProgressUpdate }) => {

  const [nexomonData, setNexomonData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [capturedNexomon, setCapturedNexomon] = useState(new Set());
  const [selectedType, setSelectedType] = useState("All");
  const token = localStorage.getItem("token");

  const nexomonTypes = [
    "All", "Normal", "Fire", "Water", "Plant", "Wind", "Electric", "Mineral", "Ghost", "Psychic"
  ];

  useEffect(() => {
    const fetchNexomon = async () => {
      try {
        const result = await useGetData.useNexomon();
        setNexomonData(result);
      } catch (error) {
        console.error("Error fetching Nexomon data", error);
      }
    };

    const fetchCaptured = async () => {
      if (!token) return;
      try {
        const response = await axios.get("https://notapedia-dybrehfjdpbkgkgf.westcentralus-01.azurewebsites.net/api/progress", {
          headers: { Authorization: `Bearer ${token}`},
        });
        setCapturedNexomon(new Set(response.data));
      } catch (error) {
        console.error ("Error fetching captured Nexomon", error);
      }
    };

    fetchNexomon();
    fetchCaptured();
  }, [token]);

  const fetchProgress = async () => {
    try {
      const response = await axios.get("https://notapedia-dybrehfjdpbkgkgf.westcentralus-01.azurewebsites.net/api/progress/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && onProgressUpdate) {
        onProgressUpdate(response.data.progressPercentage);
        console.log(`Total Nexomon: ${response.data.totalNexomon}\nNexomon Captured: ${response.data.capturedNexomonCount}\nProgress Percentage: ${response.data.progressPercentage}`);
      }
    } catch (error) {
      console.error("Error fetching progress data", error);
    }
  };

  const toggleCapture = async (nexomonId) => {
    if (!token) return alert("You must be logged in to track Nexomon!");

    const isCaptured = capturedNexomon.has(nexomonId);
    const url = `https://notapedia-dybrehfjdpbkgkgf.westcentralus-01.azurewebsites.net/api/progress/${nexomonId}`;

    try {
      if(isCaptured) {
        await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
        capturedNexomon.delete(nexomonId);
      } else {
        await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });
        capturedNexomon.add(nexomonId);
      }

      setCapturedNexomon(new Set(capturedNexomon));
      await fetchProgress();
    } catch (error) {
      console.error("Error updating capture status", error);
    }
  };

  const filteredNexomon = nexomonData.filter((nexomon) => 
    nexomon.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
  (selectedType === "All" || nexomon.type.toLowerCase() === selectedType.toLowerCase())
  );

  return (
    <div>
        <div className="databaseBackground" />
        <Container>
          <h1 className="display-3 databaseHeader text-center">
            Nexomon Database
          </h1>

          <div className="searchDiv mx-auto">
          <Form className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search Nexomon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>

          <Form className="mb-3">
            <Form.Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              {nexomonTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Select>
          </Form>
          </div>

            <table className='table table-light table-bordered table-sm mx-auto' id="database-table">
              <thead>
                <tr>
                  {token && <th>Captured</th>}
                  <th id="number-col">#</th>
                  <th>Nexomon</th>
                  <th>Sprite</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredNexomon.map( (nexomon) => {
                    let nexomonNumber = nexomon.number;
                    let nexomonNumberPadded = nexomonNumber.toString().padStart(3, "0");
                    let nexomonName = nexomon.name;
                    let nexomonType = nexomon.type;
                    let nexomonTypeImagePath = "db/extinction/images/elements/" + nexomonType.toLowerCase() + ".png";
                    let nexomonImagePath = "db/extinction/images/nexomon/small/" + nexomonNumberPadded + "-" + nexomonName.toLowerCase() + ".png";

                    return (
                      <tr key={nexomon.nexomonId}>
                        {token && (
                          <td>
                            <img 
                              src={require("../../assets/images/nexotrap.png")}
                              alt="Capture Icon"
                              className={`capture-icon ${capturedNexomon.has(nexomon.nexomonId) ? "captured" : "not-captured"}`}
                              onClick={() => toggleCapture(nexomon.nexomonId)}
                              style={{ cursor: "pointer", width: "40px", height: "40px"}}
                              />
                          </td>
                        )}
                        <td>{nexomonNumberPadded}</td>
                        <td>{nexomonName}</td>
                        <td>
                          <img className="nexomon-sprite-img-db" src={nexomonImagePath} alt={nexomonName} />
                        </td>
                        <td>
                          {nexomonType} <br />
                          <img className="element-img" src={nexomonTypeImagePath} alt={nexomonType} />
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
