// denon run --allow-net server.ts
import { Application } from "./deps.ts";
import router from "./router.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  const protocol = secure ? "https://" : "http://";
  console.log(`Listening on ${protocol}${hostname || "localhost"}:${port}`);
});

await app.listen({ port: 8000 });
