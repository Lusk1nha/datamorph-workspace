import "dotenv/config";
import { server } from "./app.ts";

const PORT = process.env.PORT || 3333;

server.listen({ port: Number(PORT), host: "0.0.0.0" }).then(() => {
  console.log(`HTTP server running, on port ${PORT}`);
});
