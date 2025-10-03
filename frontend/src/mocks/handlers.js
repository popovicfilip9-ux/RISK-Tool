import { http, HttpResponse } from "msw";

let risks = [
  { id: 1, title: "Data breach risk", description: "Sensitive data exposure", status: "open" },
  { id: 2, title: "Regulatory non-compliance", description: "Missed compliance deadline", status: "pending" },
  { id: 3, title: "System outage", description: "Unexpected downtime of service", status: "open" }
];

let nextId = 4;

export const handlers = [
  http.post("/login", () =>
    HttpResponse.json({ token: "fake-jwt-token", user: { name: "Demo User" } })
  ),

  http.get("/risks", () => HttpResponse.json(risks)),

  http.post("/risks", async ({ request }) => {
    const body = await request.json();
    const newRisk = { id: nextId++, ...body, status: "open" };
    risks.push(newRisk);
    return HttpResponse.json(newRisk);
  }),

  http.post("/risks/:id/approve", ({ params }) => {
    const risk = risks.find(r => r.id === Number(params.id));
    if (risk) {
      risk.status = "approved";
      return HttpResponse.json(risk);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  http.put("/risks/:id", async ({ params, request }) => {
    const body = await request.json();
    const idx = risks.findIndex(r => r.id === Number(params.id));
    if (idx !== -1) {
      risks[idx] = { ...risks[idx], ...body };
      return HttpResponse.json(risks[idx]);
    }
    return new HttpResponse(null, { status: 404 });
  })
];
