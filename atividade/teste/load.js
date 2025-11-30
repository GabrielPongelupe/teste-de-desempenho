import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "60s", target: 50 },     // Subida gradual até 50 usuários
    { duration: "120s", target: 50 },    // Mantém carga constante
    { duration: "30s", target: 0 },      // Redução total da carga
  ],
  thresholds: {
    http_req_duration: ["p(95) < 500"],  // Latência aceitável
    http_req_failed: ["rate < 0.01"],    // No máximo 1% de falhas
  },
};

export default function () {
  const data = JSON.stringify({ items: 1 });

  http.post("http://localhost:3000/checkout/simple", data, {
    headers: { "Content-Type": "application/json" },
  });

  // Intervalo simulado entre ações do usuário
  sleep(1);
}
