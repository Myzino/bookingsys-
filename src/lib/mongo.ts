import mongoose from 'mongoose';

const MONGO_URI =  process.env.MONGO;

if(!MONGO_URI)  {
    throw new Error('Define your MongoURI')
}


async function connectToDatabase(){
    if(mongoose.connection.readyState === 1) {
        return mongoose;
    }
    const opts = {
        bufferCommands: false,
    };

    await mongoose.connect(MONGO_URI!, opts);
    return mongoose;

}

export default connectToDatabase;