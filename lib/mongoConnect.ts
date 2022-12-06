import { MongoClient, Db } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB

/** check if the MongoDB URI is defined */
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environmental variable")
}

/** check if the MongoDB database name is defined */
if (!MONGODB_DB) {
  throw new Error("Define the MONGODB_DB environmental variable")
}

interface _MongoConnection {
  client: MongoClient
  db: Db
}

/** cache client and db to reuse an already established connection */
let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export const mongoConnect = async (): Promise<_MongoConnection> => {
  /** check if connection is already cached */
  if (cachedClient && cachedDb) {
    /** return cached values */
    return {
      client: cachedClient,
      db: cachedDb,
    }
  }

  /** if connection is not already cached set it up */
  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  const db = client.db(MONGODB_DB)

  /** set up the cache */
  cachedClient = client
  cachedDb = db

  return {
    client: cachedClient,
    db: cachedDb,
  }
}
