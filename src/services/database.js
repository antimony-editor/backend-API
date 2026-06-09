import { MongoClient } from 'mongodb';

if (!process.env.MONGO_URL) {
    throw new Error(`Missing env: MONGO_URL`);
}

const client = new MongoClient(process.env.MONGO_URL);
export default client;