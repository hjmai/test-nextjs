import mongoose from "mongoose";
const databaseUrl =
  process.env.MONGODB_URI || `mongodb://localhost:27017/pxwebsite`;

const connectDb = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) return handler(req, res);
  // Using new database connection
  return await mongoose
    .connect(databaseUrl, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => handler(req, res))
    .catch(() => {
      const errHandler = (req, res) => {
        res.status(500).send("cannot connect to database");
      };
      return errHandler;
    });
};

export default connectDb;
