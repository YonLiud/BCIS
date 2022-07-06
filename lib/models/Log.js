import mongoose from 'mongoose'

mongoose.Promise = global.Promise;

export const LogSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.models.Log || mongoose.model('Log', LogSchema)