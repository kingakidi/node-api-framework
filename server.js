require("dotenv").config();

const http = require("http");

const app = require("./startups/app");

// APP ENVIRONMENT
process.env.NODE_ENV = process.env.MODE;
if (process.env.MODE == "production") {
  process.on("uncaughtException", function (err) {
    console.error(
      new Date().toUTCString() + " uncaughtException error:",
      err.message
    );
    process.exit(0);
  });
}

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, function () {
  console.log(`Your app is listening on port `, PORT);
});
