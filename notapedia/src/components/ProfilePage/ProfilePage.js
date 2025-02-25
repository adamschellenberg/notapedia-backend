import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [capturedNotamon, setCapturedNotamon] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get("http://localhost:5026/api/profile", {
                    headers: { Authorization : `Bearer ${token}`},
                });
                setProfile(response.data);
            } catch (error) {
                console.error ("Error fetching profile data", error);
            }
        };

        const fetchCapturedNotamon = async () => {
            try {
                const response = await axios.get("http://localhost:5026/api/profile/capturednotamons", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCapturedNotamon(response.data);
            } catch(error) {
                console.error("Error fetching captured Notamon", error);
            }
        };

        if (token) {
            fetchProfileData();
            fetchCapturedNotamon();
        }
    }, [token]);

    const downloadReport = async () => {
        try {
            const response = await axios.get("http://localhost:5026/api/profile/report", {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Captured_Notamon_Report.txt');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch(error) {
            console.error("Error downloading report", error);
        }
    };

    return (
        <Container>
            <h1 className="text-center">User Profile</h1>

            {profile && (
                <div className="text-center">
                    <h3>{profile.username}</h3>
                    <img
                        src={`/db/extinction/images/items/followers/${profile.profileImage}`}
                        alt="Profile Avatar"
                        style={{ width: "100px", height: "100px", borderRadius: "50%"}}
                    />
                </div>
            )}

            <div className="text-center mt-3">
                <Button onClick={downloadReport} variant="primary">
                    Download Captured Notamon Report
                </Button>
            </div>

            <h2 className="mt-4">Captured Notamon</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Capture Date</th>
                    </tr>
                </thead>
                <tbody>
                    {capturedNotamon.length > 0 ? (
                        capturedNotamon.map((notamon, index) => (
                            <tr key={index}>
                                <td>{notamon.number}</td>
                                <td>{notamon.name}</td>
                                <td>
                                    <img
                                        src={`db/extinction/images/notamon/small/${notamon.number.toString().padStart(3,"0")}-${notamon.name.toLowerCase()}.png`}
                                        alt={notamon.name}
                                        style={{ width: "75px"}}
                                    />
                                </td>
                                <td>{new Date(notamon.captureDate + "Z").toLocaleString(undefined, {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: "true"
                                })}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No Notamon captured yet.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    )
}