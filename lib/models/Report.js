import mongoose from 'mongoose'

mongoose.Promise = global.Promise;

const ReportSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  URI: {
    type: String,
    required: true
  },
  comments: String,
  tags: [
    {
      type: String,
      default: ''
    }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  name: String,

});

module.exports = mongoose.models.Report || mongoose.model('Report', ReportSchema)