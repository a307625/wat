import mongoose from 'mongoose'
//import timestamps from 'mongoose-timestamp'

mongoose.Promise = global.Promise

const Schema = mongoose.Schema

const H2Schema = new Schema({
  tester: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
  }
})


//H2Schema.plugin(timestamps)

export default mongoose.model('H2', H2Schema)
