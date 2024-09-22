import { createServer } from "node:http";

const server = createServer((req, res) => {
  const requestUrl = req.url;

  if (requestUrl === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Hello, world!" }));

    return res.end();
  }

  if (requestUrl === "/events") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.write(JSON.stringify({ message: "Events" }));

    return res.end();
  }

  if (requestUrl?.includes("/events/")) {
    const eventId = requestUrl.split("/")[2];

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.write(JSON.stringify({ message: `Event ${eventId}` }));

    return res.end();
  }
});

server.listen(9087, () => {
  console.log("Server running at http://localhost:9087/");
});
