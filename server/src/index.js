const { app } = require("./app");
require("dotenv").config();
const { dbConnect } = require("./config/dbConfig");

const PORT = process.env.PORT || 4000;

dbConnect()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`server listening at port : ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
