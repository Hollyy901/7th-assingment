
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("mongodb+srv://hollyy199_db_user:qfyjM9ODLJExmMFU@cluster0.ravutwv.mongodb.net/bazar-dor?retryWrites=true&w=majority");
}

const uri = process.env.MONGODB_URI;

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

const clientPromise =
  globalForMongo.mongoClientPromise ??
  new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClientPromise = clientPromise;
}

export default clientPromise;
