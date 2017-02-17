import mongoose from 'mongoose'
import moment from 'moment'
//import timestamps from 'mongoose-timestamp'

mongoose.Promise = global.Promise

const Schema = mongoose.Schema


const CDMSchema = new Schema({
  tester: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  testdate: {
    type: Date,
    // default: Date.now
    default: moment(Date.now() + 8 * 60 * 60 * 1000)
  },
  fw: {
    type: String
  },
  toolname: {
    type: String
  },
  status: {
    type: String
  },
  data: {
    type: Object
  },
  createddate: {
    type: Date
  }
})


//CDMSchema.plugin(timestamps)

export default mongoose.model('CDM', CDMSchema)
