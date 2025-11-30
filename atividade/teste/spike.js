import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 10 },     // Estado inicial leve
    { duration: "10s", target: 300 },    // Pico brusco de carga
    { duration: "60s", target: 300 },     // Mantém o pico
    { duration: "10s", target: 10 },     // Queda abrupta
    { duration: "10s", target: 10 },     // Estabilização
  ],
};

export default function () {
  const body = JSON.stringify({ items: 1 });

  http.post("http://localhost:3000/checkout/simple", body, {
    headers: { "Content-Type": "application/json" },
  });

  // Pausa mínima p/ maximizar volume de requisições
  sleep(0.1);
}
