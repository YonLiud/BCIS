import mongoose from 'mongoose'

mongoose.Promise = global.Promise;

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  key: String,
  permitLevel: 
  {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)