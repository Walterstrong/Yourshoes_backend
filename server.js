const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://walter:9zQDHUvepq1K99Ja@cluster0.5tjypan.mongodb.net/papay";

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR on connection MongoDB");
    else {
      console.log("Databasega muvaffaqiyatli ulandi");
      module.exports = client;
      const app = require("./app.js");
      const server = http.createServer(app);
      let PORT = process.env.PORT || 3007;
      server.listen(PORT, function () {
        console.log(
          `The Server is running successfully on port ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
