import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use the global cache or initialize it
const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  // Log the MONGODB_URI to ensure it's loaded correctly
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing in environment",MONGODB_URI);
    throw new Error(MONGODB_URI);
  } else {
    console.log("MONGODB_URI found:", MONGODB_URI);
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'event',
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  global.mongooseCache = cached;  // Store the cache in global

  return cached.conn;
}
