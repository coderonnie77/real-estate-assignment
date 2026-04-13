import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/content");
    setData(res.data);
    setEditData(res.data);
  };

  const login = async () => {
    const res = await axios.post("http://localhost:5000/login", form);
    if (res.data.success) {
      setIsAdmin(true);
    } else {
      alert("Wrong credentials");
    }
  };

  const updateContent = async () => {
    await axios.put("http://localhost:5000/content", editData);
    alert("Updated!");
    fetchData();
  };

  // ADMIN PANEL
  if (isAdmin) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Admin Panel</h2>

        <input placeholder="Hero" value={editData.hero} onChange={(e)=>setEditData({...editData, hero: e.target.value})} /><br/><br/>
        <input placeholder="Overview" value={editData.overview} onChange={(e)=>setEditData({...editData, overview: e.target.value})} /><br/><br/>
        <input placeholder="Amenities" value={editData.amenities} onChange={(e)=>setEditData({...editData, amenities: e.target.value})} /><br/><br/>
        <input placeholder="About" value={editData.about} onChange={(e)=>setEditData({...editData, about: e.target.value})} /><br/><br/>
        <input placeholder="FAQ" value={editData.faq} onChange={(e)=>setEditData({...editData, faq: e.target.value})} /><br/><br/>

        <button onClick={updateContent}>Save</button>
      </div>
    );
  }

  if (!isAdmin && Object.keys(data).length === 0) {
    return <div>Loading...</div>;
  }

  // USER VIEW
  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar">Megaplex Prime</div>

      {/* HERO */}
      <div className="hero">
        <h1>{data.hero}</h1>
        <p>{data.overview}</p>
      </div>

      {/* AMENITIES */}
      <div className="section">
        <h2>Amenities</h2>
        <div className="card">{data.amenities}</div>
      </div>

      {/* ABOUT */}
      <div className="section">
        <h2>About Us</h2>
        <div className="card">{data.about}</div>
      </div>

      {/* FAQ */}
      <div className="section">
        <h2>FAQ</h2>
        <div className="card">{data.faq}</div>
      </div>

      {/* LOGIN */}
      <div className="login">
        <h2>Admin Login</h2>
        <input placeholder="Email" onChange={(e)=>setForm({...form, email: e.target.value})} /><br/>
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form, password: e.target.value})} /><br/>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default App;