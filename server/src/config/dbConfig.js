const mongoose = require("mongoose");

module.exports = {
  dbConnect: async () => {
    try {
      const instance = await mongoose.connect(process.env.MONGO_URI);
      console.log(`db connected at host : ${instance.connection.host}`);
    } catch (err) {
      console.log("Error connecting database" + err);
      process.exit(1);
    }
  },
};
