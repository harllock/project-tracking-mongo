import { MongoClient } from "mongodb"
/**
 * we add _mongoClientPromise key to global object
 * it holds mongodb connection in development environment
 * const or let do not work, use var
 */
export declare global {
  declare module globalThis {
    var _mongoClientPromise: Promise<MongoClient>
  }
}
