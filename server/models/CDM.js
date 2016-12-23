import mongoose from 'mongoose'
//import timestamps from 'mongoose-timestamp'

mongoose.Promise = global.Promise

const Schema = mongoose.Schema


const CDMSchema = new Schema({
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
    type: Object
  }
})


//CDMSchema.plugin(timestamps)

export default mongoose.model('CDM', CDMSchema)
