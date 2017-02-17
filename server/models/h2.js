import mongoose from 'mongoose'
import moment from 'moment'
//import timestamps from 'mongoose-timestamp'

mongoose.Promise = global.Promise

const Schema = mongoose.Schema

const H2Schema = new Schema({
  tester: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  testdate: {
    type: Date,
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
    type: String
  },
  createddate: {
    type: Date
  }
})


//H2Schema.plugin(timestamps)

export default mongoose.model('H2', H2Schema)
