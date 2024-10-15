// global.d.ts

import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the Node.js global object to include mongooseCache
declare global {
    var mongooseCache: MongooseCache | undefined;
}
