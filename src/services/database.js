import { MongoClient } from 'mongodb';

let client;

if (process.env.MONGO_URL) {
    client = new MongoClient(process.env.MONGO_URL);
} else {
    console.warn('Missing "MONGO_URL" env. Running in stateless mode.');

    client = null;
}

export default client;