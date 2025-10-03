import React, { useEffect, useState } from "react";
import { getRisks, addRisk, approveRisk } from "./services/api";

function App() {
  const [risks, setRisks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    async function fetchRisks() {
      const data = await getRisks();
      setRisks(data);
    }
    fetchRisks();
  }, []);

  const handleApprove = async (id) => {
    const updated = await approveRisk(id);
    setRisks((prev) => prev.map(r => r.id === id ? updated : r));
  };

  const handleAdd = async () => {
    if (!newTitle) return alert("Title required");
    const risk = await addRisk({ title: newTitle, description: newDescription });
    setRisks((prev) => [...prev, risk]);
    setNewTitle("");
    setNewDescription("");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>RISK Tool Demo</h1>

      <div style={{ marginBottom: "2rem" }}>
        <h3>Add New Risk</h3>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginRight: "1rem" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          style={{ marginRight: "1rem" }}
        />
        <button onClick={handleAdd}>Add Risk</button>
      </div>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((risk) => (
            <tr key={risk.id}>
              <td>{risk.id}</td>
              <td>{risk.title}</td>
              <td>{risk.description}</td>
              <td>{risk.status}</td>
              <td>
                {risk.status !== "approved" && (
                  <button onClick={() => handleApprove(risk.id)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
