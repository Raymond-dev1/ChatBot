const dotenv=require('dotenv')
const mongoose=require('mongoose')

dotenv.config()
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error('MongoDB connection error:',error)
    }
}

//Dropped an index for duplicate errors


// const db = mongoose.connection
// db.once('open', async () => {
//   try {
//     await db.collection('items').dropIndex('vendor_1');
//     console.log('Dropped vendor_1 index successfully');
//   } catch (err) {
//     console.error('Error dropping index:', err.message);
//   } finally {
//     mongoose.disconnect();
//   }
// });


module.exports={connectDB}