import mongoose from "mongoose";

// var conn = mongoose
//   .connect(
//     "mongodb+srv://rawatzon:admin123@cluster0.bcsom.mongodb.net/eproject?retryWrites=true&w=majority&appName=Cluster0",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("connection successfull.."))
//   .catch((err) => console.log(err));

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MANGODB_URL);
    console.log("Connection Successfull");
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

export default connectDB;
