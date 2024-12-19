import mongoose from "mongoose";

const connectDb = async() =>{
try {
  const connect =  await  mongoose.connect(process.env.DB_URL)
    console.log(`Database Connected in ${connect.connection.host}`)
} catch (error) {
    console.log(error)
    process.exit(1)
}
}

export default connectDb;