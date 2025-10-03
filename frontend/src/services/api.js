const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getRisks() {
  const res = await fetch(`${API_URL}/risks`);
  return res.json();
}

export async function addRisk(risk) {
  const res = await fetch(`${API_URL}/risks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(risk)
  });
  return res.json();
}

export async function approveRisk(id) {
  const res = await fetch(`${API_URL}/risks/${id}/approve`, { method: "POST" });
  return res.json();
}
