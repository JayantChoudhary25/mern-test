const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('Current working directory:', process.cwd());

// const connectDB = async () => {
//   if (process.env.NODE_ENV === "production") {
//      mongoose
//       .connect("mongodb://50.17.174.239:27017/", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         serverSelectionTimeoutMS: 30000,
//       })
//       .then(() => {
//         console.log("connected online");
//       })
//       .catch((error) => {
//         console.log("Connection error:", error);
//       });
//   } else if (process.env.NODE_ENV === "dev") {
//     await mongoose
//       .connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         serverSelectionTimeoutMS: 30000,
//       })
//       .then(() => {
//         console.log("connected");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// };

// const connectDB = async () => {
//   await mongoose
//     .connect('mongodb+srv://aadilkhan:1234@e-com.l2pmf.mongodb.net/parswell', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((data) => {
//       console.log(`Mongodb connected with server: ${data.connection.host}`);
//     });
// };

const connectDB = async () => {
  try {
    const dbUrl = process.env.NODE_ENV === 'production'
      ? 'mongodb://50.17.174.239:27017/'
      : process.env.MONGO_URI;

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 50000, // 5 seconds timeout
    };

    await mongoose.connect(dbUrl, options);

    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    // You can handle the error and take appropriate action here.
  }
};

module.exports = connectDB;
