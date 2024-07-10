import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://choeunsang:PWg0iZmdNbv29C8u@dev-cluster.kojsvzm.mongodb.net/?retryWrites=true&w=majority&appName=dev-cluster"
    );
    if (connection) {
      console.log("connected to database");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default connectToDatabase;
