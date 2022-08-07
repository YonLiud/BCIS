import mongoose from 'mongoose'

const MONGODB_DB = process.env.MONGODB_DB || "BCIS"
const MONGODB_URI = process.env.MONGODB_URI ||  "mongodb+srv://Dex:?BCSDistheBEST#!@bcsd-bcis.dsb8i.mongodb.net"

// "mongodb+srv://admin:adminadmin@cluster0.cyakadm.mongodb.net"

const MONGO_FULL_URI = `${MONGODB_URI}/${MONGODB_DB}`

if (!MONGO_FULL_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect () {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true
    }

    cached.promise = mongoose.connect(MONGO_FULL_URI, opts).then(mongoose => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect