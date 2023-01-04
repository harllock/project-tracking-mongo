import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI
/** set the maximum connections in the pool */
const MAX_POOL_SIZE = 10
const options = { maxPoolSize: MAX_POOL_SIZE }

/** check if the MongoDB URI is defined */
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environmental variable")
}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  /** in development mode, use a global variable so that the value is preserved
   * across module reloads caused by HMR (Hot Module Replacement)
   */
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  /**
   * in production mode, it's best to not use global variable
   */
  client = new MongoClient(MONGODB_URI, options)
  clientPromise = client.connect()
}

export { clientPromise }
