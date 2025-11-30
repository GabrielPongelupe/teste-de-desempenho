import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "120s", target: 200 },     // Começo forte
    { duration: "120s", target: 500 },     // Pressão intermediária
    { duration: "120s", target: 1000 },    // Estresse máximo
    { duration: "30s", target: 1000 },     // Mantém pico p/ observar falhas
  ],
};

export default function () {
  const payload = JSON.stringify({ items: 1 });

  http.post("http://localhost:3000/checkout/crypto", payload, {
    headers: { "Content-Type": "application/json" },
  });

  // Pequena pausa apenas p/ não travar execução
  sleep(0.5);
}
