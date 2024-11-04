import mongoose, { ConnectOptions } from 'mongoose'

let isConnected = false

export const dbConfig = async () => {
  mongoose.set('strictQuery', true)
  if (isConnected) {
    console.info('MongoDb is already connected')
    return
  } else {
    try {
      const dbUri = process.env.MONGODB_URI ?? ''

      let connectionOption: ConnectOptions = {
        dbName: process.env.MONGO_DB_NAME,
        user: process.env.MONGO_DB_USER,
        pass: process.env.MONGO_DB_PASSWORD
      }

      await mongoose.connect(dbUri, connectionOption)
      isConnected = true
      console.info('MongoDb Connected')
    } catch (error) {
      console.error({ error })
    }
  }
}
