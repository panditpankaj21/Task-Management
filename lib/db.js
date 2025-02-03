import mongoose from 'mongoose';

const connection = {};

async function connectToDB(){
    if(connection.isConnected) return;

    const db = await mongoose.connect(process.env.MONGODB_URI);
    // console.log('mongoDB connected: ', db);
    connection.isConnected = db.connections[0].readyState;
}

export default connectToDB