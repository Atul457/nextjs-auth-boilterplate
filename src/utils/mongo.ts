import { ErrorHandlingService } from '@/services/ErrorHandling.service'
import mongoose from 'mongoose'

const mongoIdsEqual = (id1: any, id2: any) => {
  return JSON.stringify(id1) === JSON.stringify(id2)
}

// Utility function to convert string to MongoDB ObjectId
const stringToObjectId = (idString: any) => {
  try {
    return new mongoose.Types.ObjectId(idString as string)
  } catch (error: any) {
    console.error(`Error converting string to ObjectId: ${error.message}`)
    throw ErrorHandlingService.somethingWentWrong({ message: `Error converting string to ObjectId: ${error.message}` })
  }
}

export const mongo = {
  mongoIdsEqual,
  stringToObjectId
}
