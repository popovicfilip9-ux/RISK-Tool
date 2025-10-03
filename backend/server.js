import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let risks = [
  { id: 1, title: "Data breach risk", description: "Sensitive data exposure", status: "open" },
  { id: 2, title: "Regulatory non-compliance", description: "Missed compliance deadline", status: "pending" },
  { id: 3, title: "System outage", description: "Unexpected downtime of service", status: "open" }
];

let nextId = 4;

app.post("/login", (req, res) => {
  res.json({ token: "fake-jwt-token", user: { name: "Demo User" } });
});

app.get("/risks", (req, res) => res.json(risks));

app.post("/risks", (req, res) => {
  const newRisk = { id: nextId++, ...req.body, status: "open" };
  risks.push(newRisk);
  res.json(newRisk);
});

app.put("/risks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idx = risks.findIndex(r => r.id === id);
  if (idx !== -1) {
    risks[idx] = { ...risks[idx], ...req.body };
    res.json(risks[idx]);
  } else {
    res.status(404).send("Not found");
  }
});

app.post("/risks/:id/approve", (req, res) => {
  const id = parseInt(req.params.id);
  const risk = risks.find(r => r.id === id);
  if (risk) {
    risk.status = "approved";
    res.json(risk);
  } else {
    res.status(404).send("Not found");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
