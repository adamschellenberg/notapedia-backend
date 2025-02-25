import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './ProfilePage.css';

export const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [capturedNotamon, setCapturedNotamon] = useState([]);
    const token = localStorage.getItem("token");
    const [newUsername, setNewUsername] = useState("");
    const [message, setMessage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [availableImages, setAvailableImages] = useState([
        "masquiti-follower.png",
        "lume-follower.png",
        "holoch-follower.png",
        "minet-follower.png",
        "lunabelle-follower.png"
    ]);
    const imageBasePath = "/db/extinction/images/items/followers/";

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!token) return;
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

    const handleUsernameChange = async (e) => {
        e.preventDefault();
        if (!newUsername.trim()) {
            setMessage({ type: "danger", text: "Username cannot be empty."});
            return;
        }

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(newUsername)) {
            setMessage("Username can only contain letters and numbers.");
            return;
        }

        console.log("Sending request body: ", JSON.stringify({newUsername }));
        try {
            await axios.put(
                "http://localhost:5026/api/profile/username",
                { newUsername },
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
            );

            setProfile((prev) => ({ ...prev, userName: newUsername }));
            setMessage({ type: "success", text: "Username updated successfully!" });
            setNewUsername("");
        } catch (error) {
            console.error("Error updating username", error);
            setMessage({ type: "danger", text: "Failed to update username." });
        }
    };

    const updateProfilePicture = async (image) => {
        try {
            const response = await axios.put(
                "http://localhost:5026/api/profile/image",
                { newProfileImage: image },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                setProfile((prev) => ({...prev, profileImage: image}));
                alert("Profile picture updated successfully!");
            }
        } catch (error) {
            console.error("Error updating profile picture:", error);
            alert("Failed to update profile picture.");
        }
    }

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
            <h1 className="text-center display-3 profileHeader">
                Profile Page
                </h1>

            {profile && (
                <div className="text-center">
                    <h3>{profile.userName}</h3>
                    <img
                        src={`/db/extinction/images/items/followers/${profile.profileImage}`}
                        alt="Profile Avatar"
                        style={{ width: "200px", borderRadius: "50%"}}
                    />
                </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", gap: "10px"}}>
                {availableImages.map((img) => (
                    <img
                        key={img}
                        src={imageBasePath + img}
                        alt="Profile Option"
                        onClick={() => updateProfilePicture(img)}
                        style={{
                            width: "50px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            border: profileImage === img ? "3px solid green" : "3px solid transpared",
                            transition: "border o.2s ease-in-out",
                        }}
                    />
                ))}
            </div>

            <div className="text-center mt-3">
                {message && <Alert variant={message.type}>{message.text}</Alert>}
                <Form onSubmit={handleUsernameChange} className="d-flex justify-content-center">
                    <Form.Group className="me-2">
                        <Form.Control
                            type="text"
                            placeholder="Enter new username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">Update Username</Button>
                </Form>
            </div>

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