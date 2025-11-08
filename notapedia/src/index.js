import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { HomePage, DatabasePage, GuidesPage, ItemsPage, NexomonPage, SignUpPage, LoginPage, NavBar, Footer, ProfilePage } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [progress, setProgress] = useState(null);

  return(
    <BrowserRouter>
      <NavBar progress={progress} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/database" element={<DatabasePage onProgressUpdate={setProgress}/>} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/nexomon/*" element={<NexomonPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);