import mongoose from 'mongoose'
import Config from '../config/config'

export default {
    connect: async () => {
        try {
            await mongoose.connect(Config.MONGODB_DATABASE_URL as string)
            return mongoose.connection
        } catch (error) {
            throw error
        }
    }
}

