const app = require("./app");
const { db } = require("./models");

db
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Listening on 3000");
    });
  })
  .catch(error => console.log("There was an error starting the server: ", error));
