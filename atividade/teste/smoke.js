import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  duration: "30s",
  thresholds: {
    checks: ["rate == 1"],          // Todas verificações devem passar
    http_req_failed: ["rate < 0.01"]
  },
};

export default function () {
  const resposta = http.get("http://localhost:3000/health");

  check(resposta, {
    "retornou 200 OK": (r) => r.status === 200,
  });

  // Atraso leve para evitar spam de requisições
  sleep(1);
}
